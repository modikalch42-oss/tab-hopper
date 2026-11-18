/* Tab-Hopper physics. Deterministic: only + - * / and Math.sqrt are used in the
   simulation, so the same level gives the same ball path in every browser and in
   the level generator (tools/generate.js). Element angles are stored as cos/sin. */
(function (root) {
  const W = 360, H = 560, R = 9, G = 1150, DT = 1 / 240, MAX_STEPS = 240 * 12;
  const START = { x: 30, y: 44 }, LAUNCH = { vx: 150, vy: -140 };
  const GOAL = { x: 298, y: 498, w: 58, h: 52 };
  // e = bounciness, mu = sliding friction per contact step, kick = minimum bounce-off speed
  const SPEC = {
    note: { e: .25, mu: .002 }, toast: { e: .3, mu: .003 }, sub: { e: 1, mu: 0, kick: 440 },
    popup: { e: .3, mu: .003 }, ad: { e: .35, mu: .003 }, cookie: { e: .3, mu: .003 },
    chat: { e: .45, mu: .002 }, panel: { e: .3, mu: .003 }
  };
  const PANEL = { dx: -58, dy: -116, hw: 72, hh: 86 }, CHAT_R = 22;

  function colliders(els) {
    const out = [];
    els.forEach((el, id) => {
      if (el.gone) return;
      if (el.t === 'chat') {
        out.push({ k: 'c', id, cx: el.x, cy: el.y, r: CHAT_R, ...SPEC.chat });
        if (el.open) out.push({ k: 'b', id, cx: el.x + PANEL.dx, cy: el.y + PANEL.dy, hw: PANEL.hw, hh: PANEL.hh, c: 1, s: 0, ...SPEC.panel });
      } else out.push({ k: 'b', id, cx: el.x, cy: el.y, hw: el.w / 2, hh: el.h / 2, c: el.c, s: el.s, ...SPEC[el.t] });
    });
    return out;
  }

  function start(els) {
    return { x: START.x, y: START.y, vx: LAUNCH.vx, vy: LAUNCH.vy, n: 0, slow: 0, cols: colliders(els), done: null, hits: [] };
  }

  function resolve(s, col, wx, wy, pen) {
    s.x += wx * pen; s.y += wy * pen;
    const vn = s.vx * wx + s.vy * wy;
    if (vn >= 0) return;
    let out;
    if (col.kick && -vn > 20) out = Math.max(-vn * col.e, col.kick);
    else out = -vn > 60 ? -vn * col.e : 0;
    s.vx += (out - vn) * wx; s.vy += (out - vn) * wy;
    const tx = -wy, ty = wx, vt = s.vx * tx + s.vy * ty;
    s.vx -= tx * vt * col.mu; s.vy -= ty * vt * col.mu;
    if (-vn > 50) s.hits.push({ id: col.id, v: -vn });
  }

  function step(s) {
    s.hits = [];
    s.vy += G * DT; s.x += s.vx * DT; s.y += s.vy * DT;
    if (s.x < R) { s.x = R; if (s.vx < 0) s.vx = -s.vx * .5; }
    if (s.x > W - R) { s.x = W - R; if (s.vx > 0) s.vx = -s.vx * .5; }
    if (s.y < R) { s.y = R; if (s.vy < 0) s.vy = -s.vy * .5; }
    for (const c of s.cols) {
      const dx = s.x - c.cx, dy = s.y - c.cy;
      if (c.k === 'c') {
        const d2 = dx * dx + dy * dy, rr = R + c.r;
        if (d2 >= rr * rr || d2 < 1e-9) continue;
        const d = Math.sqrt(d2); resolve(s, c, dx / d, dy / d, rr - d);
        continue;
      }
      const lx = dx * c.c + dy * c.s, ly = -dx * c.s + dy * c.c;
      if (lx > c.hw + R || lx < -c.hw - R || ly > c.hh + R || ly < -c.hh - R) continue;
      const qx = lx < -c.hw ? -c.hw : lx > c.hw ? c.hw : lx, qy = ly < -c.hh ? -c.hh : ly > c.hh ? c.hh : ly;
      const nx = lx - qx, ny = ly - qy, d2 = nx * nx + ny * ny;
      if (d2 >= R * R) continue;
      let nlx, nly, pen;
      if (d2 > 1e-9) { const d = Math.sqrt(d2); nlx = nx / d; nly = ny / d; pen = R - d; }
      else {
        const px = c.hw - (lx < 0 ? -lx : lx), py = c.hh - (ly < 0 ? -ly : ly);
        if (px < py) { nlx = lx < 0 ? -1 : 1; nly = 0; pen = px + R; } else { nlx = 0; nly = ly < 0 ? -1 : 1; pen = py + R; }
      }
      resolve(s, c, nlx * c.c - nly * c.s, nlx * c.s + nly * c.c, pen);
    }
    s.n++;
    if (s.x > GOAL.x && s.x < GOAL.x + GOAL.w && s.y > GOAL.y && s.y < GOAL.y + GOAL.h) s.done = 'win';
    else if (s.y > H + 2 * R) s.done = 'fell';
    else if (s.n >= MAX_STEPS) s.done = 'timeout';
    else {
      if (s.vx * s.vx + s.vy * s.vy < 400) { if (++s.slow > 240) s.done = 'stalled'; } else s.slow = 0;
    }
    return s;
  }

  function run(els, keepPath) {
    const s = start(els), touched = new Set(), path = [];
    while (!s.done) { step(s); for (const h of s.hits) touched.add(h.id); if (keepPath && s.n % 6 === 0) path.push([s.x, s.y]); }
    return { res: s.done, touched, path, steps: s.n };
  }

  const api = { W, H, R, DT, START, LAUNCH, GOAL, PANEL, CHAT_R, SPEC, colliders, start, step, run };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.TabSim = api;
})(this);
