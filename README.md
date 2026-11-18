# Tab-Hopper

**Look:** an early-web pixel-desktop style built around hyperlink blue and visited-link purple. It uses Pixelify Sans with Space Mono, a dithered wallpaper, hard-shadow pixel windows, pixel-art ball and confetti, and site illustrations re-rendered as ordered-dither pixel images. Each daily level takes place on one of five invented websites (`sites.js` / `sites.css`): a news site, a recipe blog, a forum, a shop page and a gadget blog. The title screen leads into the daily page. All names and brands are invented.

A daily browser-physics puzzle. A ball sits on a launch pad at the top-left of a web page drowning in pop-ups. Coins are scattered across the page, and a locked **New Tab** waits at the bottom-right. In one run the ball has to collect **every coin**, which unlocks the tab, and then land in it. You get **6 moves** to rearrange the page: drag notes, notifications, buttons and pop-ups; close ads and pop-ups; accept the cookie banner; open or shut the chat. Launch as often as you like. Your score is how many **launches** it took, and the share text is a grid of coins collected per attempt:

```
Tab-Hopper #2 · 3 launches · 5/6 moves
🟡🟡⚫⚫⚫
🟡🟡🟡⚫🟡
🟡🟡🟡🟡🟡 🚩
```

- **Play:** open `index.html` (it loads `sim.js`, `levels.js`, `sites.js` and `sites.css` from the same folder). Works on GitHub Pages. `?level=N` opens a specific page for practice.
- **Physics:** `sim.js` is a small fixed-timestep engine that uses only arithmetic and square roots, so every browser and the level generator compute the same ball path.
- **Levels:** `tools/generate.js` builds `levels.js` (365 daily pages). For each one it:
  1. finds a layout where 2–3 elements carry the ball into the goal, every one of them is needed, and the solution still works with any piece nudged 4 px;
  2. drops 3–5 coins along that path, re-checking the nudge tolerance with the coins required;
  3. adds clutter that doesn't break it or cover a coin, with no overlapping elements;
  4. breaks it with 2–4 moves (knock a ramp away, drop a pop-up/ad/cookie banner in the path, close the chat), leaving slack in the 6-move budget;
  5. checks that the broken page fails and that no single action fixes it.

  Regenerate with `node tools/generate.js 365 20261118` (about 40 seconds).
- **Daily number:** #1 = 18 Nov 2026, from the local date. Best daily results are saved in localStorage.
