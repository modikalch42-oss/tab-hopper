# Tab-Hopper

**Look:** an early-web pixel-desktop style built around hyperlink blue and visited-link purple. It uses Pixelify Sans with Space Mono, a dithered wallpaper, hard-shadow pixel windows, pixel-art ball and confetti, and site illustrations re-rendered as ordered-dither pixel images. Each daily level takes place on one of five invented websites (`sites.js` / `sites.css`): a news site, a recipe blog, a forum, a shop page and a gadget blog. The title screen leads into the daily page. All names and brands are invented.

A daily browser-physics puzzle. A ball sits on a launch pad at the top-left of a web page drowning in pop-ups, and a **New Tab** waits in the bottom-right corner. You get **6 moves** to rearrange the page: drag notes, notifications, buttons and pop-ups; close ads and pop-ups; accept the cookie banner; open or shut the chat. Then launch. Coins are scattered across the page, and each one the ball grabs on a run that ends in the New Tab is worth **100 points**. You can finish with no coins, but a perfect run takes them all. Relaunch as often as you like; your best finish counts.

```
Tab-Hopper #2 📱 · 400 pts · 3 launches
🟡🟡⚫⚫⚫
🟡🟡⚫🟡⚫ 🚩
🟡🟡🟡🟡⚫ 🚩
```

**Layouts:** phones get a portrait page (360×560 world, `levels.js`). Desktops and tablets get a landscape page (640×400 world, `levels-land.js`), picked by screen size, so they get a different daily puzzle (marked 📱/🖥️ in the share text). `?layout=portrait|landscape` forces one.

- **Play:** open `index.html` (it loads `sim.js`, `levels.js`, `levels-land.js`, `sites.js` and `sites.css` from the same folder). Works on GitHub Pages. `?level=N` opens a specific page for practice.
- **Physics:** `sim.js` is a small fixed-timestep engine that uses only arithmetic and square roots, so every browser and the level generator compute the same ball path.
- **Levels:** `tools/generate.js` builds `levels.js` (365 daily pages). For each one it:
  1. finds a layout where 2–3 elements carry the ball into the goal, every one of them is needed, and the solution still works with any piece nudged 4 px;
  2. drops 3–5 coins along that path, re-checking the nudge tolerance with the coins required;
  3. adds clutter that doesn't break it or cover a coin, with no overlapping elements;
  4. breaks it with 2–4 moves (knock a ramp away, drop a pop-up/ad/cookie banner in the path, close the chat), leaving slack in the 6-move budget;
  5. checks that the broken page can't reach the New Tab at all, and that no single action gives a perfect run.

  Regenerate with `node tools/generate.js 365 20261118` for portrait and `WORLD=landscape node tools/generate.js 365 20261118` for landscape (about 40 seconds each).
- **Daily number:** #1 = 18 Nov 2026, from the local date. Best daily results are saved in localStorage.
