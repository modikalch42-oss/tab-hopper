// Daily themes. Every theme reskins the same physics pieces, so any level works with any theme:
//   note   = tilted ramp (draggable)        toast  = flat bar (draggable)
//   sub    = bouncy pad (draggable)         popup  = big box (draggable, ✕ closes)
//   ad     = small box (✕ closes)           cookie = full-width barrier (button removes)
//   chat   = small round toggle that opens a big panel
// The 'web' theme (fake websites from sites.js) is handled in index.html; the others live here.
// el(e, k, h) returns the inner HTML for an element: k = how many of that type came before, h = helpers.
(function () {
  const seeded = s => () => (s = s * 16807 % 2147483647) / 2147483647;
  const rects = (n, r, W, H, f) => { let o = ''; for (let i = 0; i < n; i++) o += f(r, W, H, i); return o; };

  window.TAB_THEMES = {
    space: {
      name: 'Docking Bay 9', place: 'orbit-9 · docking bay', acc: '#2b44ff', goal: 'WARP',
      pal: ['#17131f', '#2a1650', '#6a2bd9', '#2b44ff', '#ffd23f', '#ffffff'],
      nouns: { drag: 'solar panels, girders, bounce pads and cargo crates', close: 'jettison ✕ crates and space junk', accept: 'power down laser gates', toggle: 'open or shut the airlock' },
      scene(W, H) {
        const r = seeded(7);
        const stars = rects(90, r, W, H, (r, W, H) => { const s = r() < .15 ? 4 : 2; return `<rect x="${(r() * W) | 0}" y="${(r() * H) | 0}" width="${s}" height="${s}" fill="#fff"/>`; });
        return `<div class="scene"><svg viewBox="0 0 ${W} ${H}"><defs><linearGradient id="spg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0a24"/><stop offset="1" stop-color="#2a1650"/></linearGradient></defs>
          <rect width="${W}" height="${H}" fill="url(#spg)"/>${stars}
          <circle cx="${W * .16}" cy="${H * 1.02}" r="${H * .34}" fill="#6a2bd9"/><circle cx="${W * .12}" cy="${H * .96}" r="${H * .28}" fill="#8b6cff"/>
          <ellipse cx="${W * .16}" cy="${H * 1.0}" rx="${H * .55}" ry="${H * .07}" fill="none" stroke="#ffd23f" stroke-width="6"/>
          <circle cx="${W * .86}" cy="${H * .16}" r="16" fill="#ffd23f"/>
          <rect x="0" y="0" width="${W}" height="30" fill="#2a1650"/><rect x="0" y="28" width="${W}" height="4" fill="#ffd23f"/></svg>
          <div class="sc-sign">DOCKING BAY 9 <span>›› WARP</span></div></div>`;
      },
      el(e, k, h) {
        switch (e.t) {
          case 'note': return '<i class="cells"></i>';
          case 'toast': return '<i class="truss"></i>';
          case 'sub': return '▲ BOUNCE ▲';
          case 'popup': return `<div class="haz"></div><button class="x-btn" aria-label="Jettison">${h.XI}</button><div class="crate"><b>CARGO</b><span>${['07-B · FRAGILE', 'SPARE SOCKS', 'ASTRO-SNACKS'][k % 3]}</span></div>`;
          case 'ad': return `<button class="x-btn" aria-label="Jettison">${h.XI}</button><div class="junk"><b>SAT-${4 + k}</b><span>OFFLINE · JUNK</span></div>`;
          case 'cookie': return `<i class="beams"></i><i class="em l"></i><i class="em r"></i><button class="accept">POWER OFF</button>`;
        }
      },
      bubble: '⏻', panel: '<div class="door"><b>AIRLOCK</b><span>CYCLING…</span></div>'
    },

    kitchen: {
      name: "Nan's Kitchen", place: "nan's kitchen · top shelf", acc: '#ff8a00', goal: 'PLATE',
      pal: ['#17131f', '#fbf8f1', '#ff8a00', '#ffd23f', '#cdd4ff', '#ff4f8b'],
      nouns: { drag: 'spatulas, baguettes, jellies and cereal boxes', close: 'bin ✕ cereal boxes and recipe cards', accept: 'eat the cookie trays', toggle: 'open or shut the cupboard' },
      scene(W, H) {
        const win = Math.min(W * .3, 170);
        return `<div class="scene"><svg viewBox="0 0 ${W} ${H}"><defs><pattern id="ktile" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#fbf8f1"/><rect width="20" height="20" fill="#cdd4ff"/><rect x="20" y="20" width="20" height="20" fill="#cdd4ff"/></pattern>
          <linearGradient id="ksky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b44ff"/><stop offset="1" stop-color="#cdd4ff"/></linearGradient></defs>
          <rect width="${W}" height="${H}" fill="url(#ktile)"/>
          <rect x="${W - win - 24}" y="60" width="${win}" height="${win * .8}" fill="url(#ksky)" stroke="#17131f" stroke-width="6"/>
          <circle cx="${W - win * .4 - 24}" cy="${60 + win * .3}" r="${win * .12}" fill="#ffd23f"/>
          <rect x="${W - win / 2 - 27}" y="60" width="6" height="${win * .8}" fill="#17131f"/><rect x="${W - win - 24}" y="${60 + win * .4 - 3}" width="${win}" height="6" fill="#17131f"/>
          <circle cx="70" cy="90" r="26" fill="#fbf8f1" stroke="#17131f" stroke-width="5"/><rect x="68" y="72" width="4" height="20" fill="#17131f"/><rect x="68" y="88" width="14" height="4" fill="#17131f"/>
          <rect x="0" y="${H - 40}" width="${W}" height="40" fill="#c98a4b"/><rect x="0" y="${H - 44}" width="${W}" height="6" fill="#17131f"/></svg>
          <div class="sc-sign">TODAY: CHAOS <span>(nan)</span></div></div>`;
      },
      el(e, k, h) {
        switch (e.t) {
          case 'note': return '<i class="grain"></i>';
          case 'toast': return '<i class="scores"></i>';
          case 'sub': return 'JELLY';
          case 'popup': return `<button class="x-btn" aria-label="Bin it">${h.XI}</button><div class="box"><b>${['CRUNCH-O’S', 'BRAN FLAKES', 'CHOCO POPS'][k % 3]}</b><span>NOW 20% MORE CRUNCH</span><i class="bowl"></i></div>`;
          case 'ad': return `<button class="x-btn" aria-label="Bin it">${h.XI}</button><div class="card"><b>${['SHOPPING', 'NAN’S SCONES', 'TO DO'][k % 3]}</b><span>${['eggs · flour · more eggs', '2 cups of a feeling', 'descale kettle (again)'][k % 3]}</span></div>`;
          case 'cookie': return `<i class="tray"></i><button class="accept">EAT THEM</button>`;
        }
      },
      bubble: '◉', panel: '<div class="door"><i class="knob"></i><b>CUPBOARD</b></div>'
    },

    roof: {
      name: 'Night Rooftops', place: 'rooftops · 3am', acc: '#6a2bd9', goal: 'HOME',
      pal: ['#17131f', '#2a1650', '#6a2bd9', '#ff4f8b', '#ffd23f', '#fbf8f1'],
      nouns: { drag: 'planks, awnings, trampolines and billboards', close: 'tear down ✕ billboards and posters', accept: 'take in the washing', toggle: 'roll the shutter up or down' },
      scene(W, H) {
        const r = seeded(11);
        let city = '', x = 0;
        while (x < W) {
          const w = 40 + (r() * 60 | 0), h = H * (.25 + r() * .35), y = H - h;
          city += `<rect x="${x}" y="${y | 0}" width="${w}" height="${h | 0}" fill="${r() < .5 ? '#2a1650' : '#3b1f78'}"/>`;
          for (let wy = y + 10; wy < H - 12; wy += 16) for (let wx = x + 6; wx < x + w - 8; wx += 12) if (r() < .35) city += `<rect x="${wx | 0}" y="${wy | 0}" width="5" height="7" fill="#ffd23f"/>`;
          x += w + 4;
        }
        const stars = rects(50, r, W, H * .5, (r, W, H) => `<rect x="${(r() * W) | 0}" y="${(r() * H) | 0}" width="2" height="2" fill="#fbf8f1"/>`);
        return `<div class="scene"><svg viewBox="0 0 ${W} ${H}"><defs><linearGradient id="rsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#120c2e"/><stop offset="1" stop-color="#6a2bd9"/></linearGradient></defs>
          <rect width="${W}" height="${H}" fill="url(#rsky)"/>${stars}<circle cx="${W * .8}" cy="${H * .17}" r="26" fill="#fbf8f1"/><circle cx="${W * .8 - 10}" cy="${H * .17 - 6}" r="22" fill="#120c2e" opacity=".0"/>
          ${city}<rect x="${W * .5}" y="${H * .3}" width="34" height="26" fill="#17131f"/><rect x="${W * .5 + 4}" y="${H * .3 + 26}" width="4" height="40" fill="#17131f"/><rect x="${W * .5 + 26}" y="${H * .3 + 26}" width="4" height="40" fill="#17131f"/></svg>
          <div class="sc-sign">OPEN 24/7 <span>·  rooftop deli</span></div></div>`;
      },
      el(e, k, h) {
        switch (e.t) {
          case 'note': return '<i class="grain"></i>';
          case 'toast': return '<i class="stripes"></i>';
          case 'sub': return '<i class="springs"></i>';
          case 'popup': return `<button class="x-btn" aria-label="Tear down">${h.XI}</button><div class="board"><b>${['PIZZA 24/7', 'GYM? LATER', 'BUY BONDS?'][k % 3]}</b><span>${['open all night', 'first month free', 'probably fine'][k % 3]}</span></div>`;
          case 'ad': return `<button class="x-btn" aria-label="Tear down">${h.XI}</button><div class="poster"><b>${['LOST CAT', 'BAND TONIGHT', 'FLAT TO LET'][k % 3]}</b><span>${['answers to “Dave”', 'the kettle heads', 'no pets (see left)'][k % 3]}</span></div>`;
          case 'cookie': return `<i class="line"></i><i class="clothes"></i><button class="accept">TAKE IN</button>`;
        }
      },
      bubble: '▤', panel: '<div class="door"><b>SHUTTER</b><span>roll up for deli</span></div>'
    }
  };
  // rotation by daily level index: 0 = web (today), then space, kitchen, rooftops, repeat
  window.TAB_THEME_ORDER = ['web', 'space', 'kitchen', 'roof'];
})();
