# Tab-Hopper

**Look:** an early-web pixel-desktop style built around hyperlink blue and visited-link purple. It uses Pixelify Sans with Space Mono, a dithered wallpaper, hard-shadow pixel windows, pixel-art ball and confetti, and site illustrations re-rendered as ordered-dither pixel images. Each daily level takes place on one of five invented websites (`sites.js` / `sites.css`): a news site, a recipe blog, a forum, a shop page and a gadget blog. The title screen leads into the daily page. All names and brands are invented.

A daily browser-physics puzzle. A ball sits at the top-left of a cluttered fake webpage, and a glowing Goal tab waits at the bottom-right. You get **3 actions** (drag a note, toast, button or pop-up; close a pop-up or ad; accept the cookie banner; toggle the chat widget) to turn the clutter into a ramp, then hit **Launch**.

- **Play:** open `index.html` (it loads `sim.js`, `levels.js`, `sites.js` and `sites.css` from the same folder). Works on GitHub Pages. `?level=N` opens a specific page for practice.
- **Physics:** `sim.js` is a small fixed-timestep engine that uses only arithmetic and square roots, so every browser and the level generator compute the same ball path.
- **Levels:** `tools/generate.js` builds `levels.js` (365 daily pages). For each one it:
  1. finds a layout where 2–3 elements carry the ball into the goal, every one of them is needed, and the solution still works with any piece nudged 4 px;
  2. adds clutter that doesn't break it, with no overlapping elements;
  3. breaks it with *par* moves (knock a ramp away, drop a pop-up/ad/cookie banner in the path, close the chat);
  4. checks that the broken page fails, that no single action fixes a par-2+ page, and that no pair of actions fixes a par-3 page.

  Regenerate with `node tools/generate.js 365 20261118`, which takes about 40 minutes on one core. For speed, run batches in parallel with different seeds, writing to `.json` files (`node tools/generate.js 92 20261118 a.json`), then join them with `node tools/merge.js a.json b.json …`.
- **Daily number:** #1 = 18 Nov 2026, from the local date. Best daily results are saved in localStorage.
