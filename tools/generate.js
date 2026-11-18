// Builds levels.js: a list of daily puzzles, each checked by simulation.
// Usage: node tools/generate.js [count] [seed] [dry | out.json]
// 1. Find a "solved" page where 2-3 UI elements carry the ball into the goal,
//    every one of them is needed, and it still works with any piece nudged 4px.
// 2. Drop 3-5 coins along that path (the ball must collect all of them, then reach
//    the goal), again checked against nudges.
// 3. Add clutter that does not break it and covers no coins.
// 4. Break it with k = 2-4 moves (knock a ramp away, drop a pop-up/ad/cookie banner in
//    the path, close the chat), each of which breaks the page on its own.
// 5. Check the broken page fails and that no single action fixes it.
// Players get 6 moves, so there is always room to experiment.
const Sim = require('../sim.js');
const fs = require('fs');
const { W, H, START, GOAL } = Sim;

function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
let rnd;
const ri = (a, b) => Math.round(a + rnd() * (b - a));
const pick = a => a[Math.floor(rnd() * a.length)];
const cs = deg => { const r = deg * Math.PI / 180; return [+Math.cos(r).toFixed(5), +Math.sin(r).toFixed(5)]; };
const clone = els => els.map(e => ({ ...e }));
const DRAG = new Set(['note', 'toast', 'sub', 'popup']);
const NOTE_TXT = ['buy milk', 'call mum!!', 'drink water', 'ship it', 'fix bug #4', 'pw: hunter2', 'gym? lol', 'reply to Dave', 'TODO: sleep'];
const TOAST_TXT = ['✅ Saved!', '🔔 3 new messages', '🔋 Battery at 4%', '📦 Your order shipped', '⬇️ Download complete', '🎉 You levelled up!'];
const POPUP_TXT = [['Newsletter', 'Get 10% off your first scroll!'], ['Wait! Don’t go!', 'Join 2 million subscribers'], ['Notifications', 'Allow us to ping you forever?'], ['Survey', 'How was your 0.4s visit?']];
const AD_TXT = ['You won’t BELIEVE this one weird trick', 'Congratulations! Visitor #1,000,000', 'Doctors HATE this ball', 'Local blob finds love'];

// half extents of an element's rotated bounding box
function ext(e) { if (e.t === 'chat') return [22, 22]; const hw = e.w / 2, hh = e.h / 2, c = Math.abs(e.c), s = Math.abs(e.s); return [hw * c + hh * s, hw * s + hh * c]; }
function inPage(e) { const [ex, ey] = ext(e); return e.x - ex >= 0 && e.x + ex <= W && e.y - ey >= 34 && e.y + ey <= H; }
function overlapsBox(e, b, pad) { const [ex, ey] = ext(e); return e.x + ex > b.x - pad && e.x - ex < b.x + b.w + pad && e.y + ey > b.y - pad && e.y - ey < b.y + b.h + pad; }
const START_BOX = { x: START.x - 18, y: START.y - 18, w: 36, h: 36 };
function legal(e) { return inPage(e) && !overlapsBox(e, START_BOX, 6) && !overlapsBox(e, GOAL, 4); }
function panelLegal(e) { if (e.t !== 'chat' || !e.open) return true; const p = Sim.PANEL, px = e.x + p.dx, py = e.y + p.dy; return px - p.hw >= 0 && px + p.hw <= W && py - p.hh >= 34 && !overlapsBox({ t: 'x', x: px, y: py, w: 2 * p.hw, h: 2 * p.hh, c: 1, s: 0 }, START_BOX, 6); }

// screen boxes an element occupies (chat: bubble, plus its panel when open)
function boxes(e) {
  if (e.gone) return [];
  if (e.t === 'chat') { const b = [[e.x - 22, e.y - 22, e.x + 22, e.y + 22]]; if (e.open) { const p = Sim.PANEL, px = e.x + p.dx, py = e.y + p.dy; b.push([px - p.hw, py - p.hh, px + p.hw, py + p.hh]); } return b; }
  const [ex, ey] = ext(e); return [[e.x - ex, e.y - ey, e.x + ex, e.y + ey]];
}
function clashes(e, others, pad = 3) { const A = boxes(e); return others.some(o => o !== e && boxes(o).some(b => A.some(a => a[0] < b[2] + pad && a[2] > b[0] - pad && a[1] < b[3] + pad && a[3] > b[1] - pad))); }
const tidy = els => els.every(e => !clashes(e, els));
function mk(t, x, y) {
  let e;
  if (t === 'note') { const [c, s] = cs((rnd() < .5 ? -1 : 1) * (8 + rnd() * 22)); e = { t, w: ri(110, 140), h: 26, c, s, txt: pick(NOTE_TXT), hue: ri(0, 3) }; }
  else if (t === 'toast') e = { t, w: ri(150, 180), h: 34, c: 1, s: 0, txt: pick(TOAST_TXT) };
  else if (t === 'sub') { const [c, s] = cs((rnd() < .5 ? -1 : 1) * rnd() * 24); e = { t, w: 96, h: 30, c, s }; }
  else if (t === 'popup') { const p = pick(POPUP_TXT); e = { t, w: ri(160, 190), h: ri(105, 125), c: 1, s: 0, title: p[0], txt: p[1] }; }
  else if (t === 'ad') e = { t, w: ri(130, 150), h: ri(62, 74), c: 1, s: 0, txt: pick(AD_TXT) };
  else if (t === 'cookie') e = { t, w: W, h: 56, c: 1, s: 0, x: W / 2 };
  else if (t === 'chat') e = { t, open: false };
  e.x = e.x ?? x ?? ri(20, W - 20); e.y = y ?? ri(70, H - 30);
  e.x = Math.round(e.x); e.y = Math.round(e.y);
  return e;
}
function randomLegal(t, others = [], tries = 60) { for (let i = 0; i < tries; i++) { const e = mk(t); if (t === 'chat' && rnd() < .5) e.open = true; if (legal(e) && panelLegal(e) && !clashes(e, others)) return e; } return null; }
// coins for the level being built; a page only "wins" if the ball collects all of them and then reaches the goal
let COINS = [];
const wins = els => Sim.run(els, false, COINS).res === 'win';
// distance from a point to an element's solid shape
function distTo(e, x, y) {
  if (e.t === 'chat') {
    let d = Math.hypot(x - e.x, y - e.y) - Sim.CHAT_R;
    if (e.open) { const p = Sim.PANEL; d = Math.min(d, boxDist(x, y, e.x + p.dx, e.y + p.dy, p.hw, p.hh, 1, 0)); }
    return d;
  }
  return boxDist(x, y, e.x, e.y, e.w / 2, e.h / 2, e.c, e.s);
}
function boxDist(x, y, cx, cy, hw, hh, c, s) {
  const dx = x - cx, dy = y - cy, lx = dx * c + dy * s, ly = -dx * s + dy * c;
  const qx = Math.max(-hw, Math.min(hw, lx)), qy = Math.max(-hh, Math.min(hh, ly));
  return Math.hypot(lx - qx, ly - qy);
}
const coinClash = (e, coins) => coins.some(([x, y]) => distTo(e, x, y) < Sim.CR + 3);

// spread 3-5 coins along the designed path; keep them apart, off the solids, and robust to nudges
function placeCoins(sol) {
  const pts = sol.path, len = [0];
  for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = len[len.length - 1];
  for (let attempt = 0; attempt < 14; attempt++) {
    const n = ri(3, 5), coins = [];
    for (let k = 0; k < n; k++) {
      const f = .14 + (.8 * (k + .5)) / n + (rnd() - .5) * .06, target = f * total;
      let j = 0; while (j < len.length - 1 && len[j] < target) j++;
      coins.push([Math.round(pts[j][0]), Math.round(pts[j][1])]);
    }
    const G = Sim.GOAL;
    if (coins.some(([x, y], i) => coins.some(([x2, y2], j) => j > i && Math.hypot(x - x2, y - y2) < 42))) continue;
    if (coins.some(([x, y]) => Math.hypot(x - START.x, y - START.y) < 45 || (x > G.x - 14 && x < G.x + G.w + 14 && y > G.y - 14 && y < G.y + G.h + 14))) continue;
    if (sol.els.some(e => coinClash(e, coins))) continue;
    COINS = coins;
    if (wins(sol.els) && robust(sol.els)) return coins;
  }
  COINS = [];
  return null;
}

function findSolved() {
  for (let tries = 0; tries < 20000; tries++) {
    const n = rnd() < .55 ? 2 : 3, els = [];
    const pool = ['note', 'note', 'note', 'toast', 'sub', 'sub', 'popup', 'chat'];
    for (let i = 0; i < n; i++) { const e = randomLegal(pick(pool), els); if (e) els.push(e); }
    if (els.length < 2) continue;
    const r = Sim.run(els, true);
    if (r.res !== 'win' || r.touched.size < 2) continue;
    const used = els.filter((e, i) => r.touched.has(i));
    if (used.length < 2) continue;
    // every element we keep must be needed
    if (!used.every((e, i) => !wins(used.filter((_, j) => j !== i)))) continue;
    const r2 = Sim.run(used, true);
    if (r2.res !== 'win') continue;
    // forgiving: still wins with any one piece nudged 4px in any direction
    if (!robust(used)) continue;
    return { els: used, path: r2.path, tries };
  }
  return null;
}

const NUDGE = [[4, 0], [-4, 0], [0, 4], [0, -4], [3, 3], [-3, -3], [3, -3], [-3, 3]];
function robust(els) { return els.every((e, i) => NUDGE.every(([dx, dy]) => wins(els.map((x, j) => j === i ? { ...x, x: x.x + dx, y: x.y + dy } : x)))); }
function addClutter(els) {
  const want = ri(2, 4), types = ['popup', 'ad', 'toast', 'note', 'chat', 'sub', 'note'];
  for (let i = 0, added = 0; i < 40 && added < want; i++) {
    const e = randomLegal(pick(types), els); if (!e || coinClash(e, COINS)) continue;
    if (e.t === 'chat' && els.some(x => x.t === 'chat')) continue;
    const next = [...els, e];
    if (wins(next) && robust(next.slice(0, els.n0).concat(next.slice(els.n0)))) { next.n0 = els.n0; els = next; added++; }
  }
  return els;
}

// all single actions from a state; drags go to a coarse grid of spots
function singleActions(els, step = 22) {
  const acts = [];
  els.forEach((e, i) => {
    if (e.gone) return;
    if (e.t === 'popup' || e.t === 'ad' || e.t === 'cookie') acts.push(s => { s[i].gone = true; });
    if (e.t === 'chat') acts.push(s => { s[i].open = !s[i].open; });
    if (DRAG.has(e.t)) for (let x = 24; x <= W - 24; x += step) for (let y = 60; y <= H - 20; y += step) {
      const m = { ...e, x, y }; if (legal(m)) acts.push(s => { s[i].x = x; s[i].y = y; });
    }
  });
  return acts;
}

function scramble(solved, path, k) {
  const ops = [];
  const pts = path.slice(Math.floor(path.length * .12), Math.floor(path.length * .9));
  const solIdx = solved.map((e, i) => i).filter(i => i < solved.n0);
  for (let tries = 0; ops.length < k && tries < 60; tries++) {
    const kind = pick(['move', 'move', 'move', 'popup', 'ad', 'cookie', 'chat']);
    if (kind === 'cookie' && ops.some(o => o.kind === 'add' && o.e.t === 'cookie')) continue; // one cookie banner per page
    let op = null;
    if (kind === 'move') {
      const cand = solIdx.filter(i => DRAG.has(solved[i].t) && !ops.some(o => o.i === i)); if (!cand.length) continue;
      const i = pick(cand), e = solved[i];
      for (let t = 0; t < 40; t++) { const x = ri(30, W - 30), y = ri(70, H - 30); if (Math.hypot(x - e.x, y - e.y) < 90) continue; const m = { ...e, x, y }; if (legal(m) && !coinClash(m, COINS) && !clashes(m, applyOps(solved, ops).filter((_, j) => j !== i))) { op = { kind, i, x, y }; break; } }
    } else if (kind === 'chat') {
      const i = solved.findIndex(e => e.t === 'chat' && e.open); if (i < 0 || i >= solved.n0 || ops.some(o => o.i === i)) continue; op = { kind, i };
    } else if (pts.length) {
      const p = pick(pts), t = kind;
      const e = t === 'cookie' ? mk('cookie', W / 2, Math.round(p[1])) : mk(t, Math.round(p[0] + ri(-20, 20)), Math.round(p[1] + ri(-15, 15)));
      if (!legal(e) || (t === 'cookie' && (e.y < 110 || e.y > H - 90)) || coinClash(e, COINS) || clashes(e, applyOps(solved, ops))) continue;
      op = { kind: 'add', e };
    }
    if (!op) continue;
    if (wins(applyOps(solved, [op]))) continue;   // each break must break the page on its own
    ops.push(op);
  }
  return ops.length === k ? ops : null;
}
function applyOps(els, ops) {
  const s = clone(els);
  for (const o of ops) { if (o.kind === 'move') { s[o.i].x = o.x; s[o.i].y = o.y; } else if (o.kind === 'chat') s[o.i].open = !s[o.i].open; else if (o.kind === 'add') s.push({ ...o.e }); }
  return s;
}

function makeLevel(k) {
  COINS = [];
  const sol = findSolved(); if (!sol) return null;
  const coins = placeCoins(sol); if (!coins) return null;
  const n0 = sol.els.length;
  const base = sol.els.slice(); base.n0 = n0;
  let els = addClutter(base);
  for (let attempt = 0; attempt < 8; attempt++) {
    const ops = scramble(els, sol.path, k); if (!ops) continue;
    const start = applyOps(els, ops);
    if (wins(start) || !tidy(start)) continue;
    if (k >= 2) { let ok = true; for (const a of singleActions(start)) { const s = clone(start); a(s); if (wins(s)) { ok = false; break; } } if (!ok) continue; }
    // the designed fix, one action per break (used for testing and a future "show me" button)
    let added = els.length;
    const fix = ops.map(o => o.kind === 'move' ? { a: 'drag', i: o.i, x: els[o.i].x, y: els[o.i].y } : o.kind === 'chat' ? { a: 'chat', i: o.i } : { a: o.e.t === 'cookie' ? 'accept' : 'close', i: added++ });
    // shuffle so the order does not hint at the solution
    const order = start.map((_, i) => i).sort(() => rnd() - .5), inv = [];
    order.forEach((oi, ni) => inv[oi] = ni);
    return { par: k, coins, els: order.map(i => start[i]), fix: fix.map(f => ({ ...f, i: inv[f.i] })) };
  }
  return null;
}

const count = +(process.argv[2] || 365), seed = +(process.argv[3] || 20261118);
rnd = mulberry32(seed);
const levels = [], t0 = Date.now();
// difficulty = number of breaks to undo (players get 6 moves): 30% two, 45% three, 25% four.
// The target is picked first so retries don't skew the mix easy.
while (levels.length < count) {
  const k = rnd() < .3 ? 2 : rnd() < .643 ? 3 : 4;
  let L = null; while (!L) L = makeLevel(k);
  // final determinism check: the shipped start state must not win, and must round-trip through JSON unchanged
  const back = JSON.parse(JSON.stringify(L.els)); if (wins(back)) continue;
  levels.push(L);
  if (levels.length % 25 === 0) console.error(levels.length, 'levels', ((Date.now() - t0) / 1000).toFixed(1) + 's');
}
const pars = [2, 3, 4].map(p => levels.filter(l => l.par === p).length);
console.error('done', levels.length, 'breaks 2/3/4:', pars.join('/'), ((Date.now() - t0) / 1000).toFixed(1) + 's');
// argv[4]: 'dry' = don't write; a .json path = write raw batch (merge with tools/merge.js); default = write levels.js
const outArg = process.argv[4];
if (outArg && outArg.endsWith('.json')) fs.writeFileSync(outArg, JSON.stringify(levels));
else if (outArg !== 'dry') fs.writeFileSync(__dirname + '/../levels.js', '// generated by tools/generate.js — do not edit\nwindow.TAB_LEVELS=' + JSON.stringify(levels) + ';\n');
