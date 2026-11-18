# Tab-Hopper

**Look:** an early-web pixel-desktop style built around hyperlink blue and visited-link purple. It uses Pixelify Sans with Space Mono, a dithered wallpaper, hard-shadow pixel windows, a pixel-art ball, coins and confetti, and backdrops re-rendered as ordered-dither pixel images.

**Daily themes:** every theme reskins the same physics pieces, so any level works in any theme. The rotation is: 🌐 **web page** (one of five invented websites in `sites.js`, with pop-ups, cookie banners and chat widgets) → 🚀 **Docking Bay 9** (solar panels, girders, cargo crates, laser gates, an airlock) → 🍳 **Nan's Kitchen** (spatulas, baguettes, jelly, cereal boxes, cookie trays, a cupboard) → 🌙 **Night Rooftops** (planks, awnings, trampolines, neon billboards, a washing line, a shutter). To add a theme, add an entry to `themes.js` and its skins to `themes.css`, then put it in `TAB_THEME_ORDER`. `?theme=space|kitchen|roof|web` forces one for testing.

A daily browser-physics puzzle. A ball sits on a launch pad at the top-left of a web page drowning in pop-ups, and a **New Tab** waits in the bottom-right corner. You get **6 moves** to rearrange the page: drag notes, notifications, buttons and pop-ups; close ads and pop-ups; accept the cookie banner; open or shut the chat. Then launch. Coins are scattered across the page, and each one the ball grabs on a run that ends in the New Tab is worth **100 points**. You can finish with no coins, but a perfect run takes them all. Relaunch as often as you like; your best finish counts.

```
Tab-Hopper #2 📱 · 400 pts · 3 launches
🟡🟡⚫⚫⚫
🟡🟡⚫🟡⚫ 🚩
🟡🟡🟡🟡⚫ 🚩
```

**Daily features:**
- **One official attempt per day.** You get 3 launches and 6 moves, and your best finish is the day's score. Progress survives reloads. After that the page locks with a countdown to tomorrow, and you can keep playing unranked.
- **Weekly rhythm.** Difficulty climbs through the week: easy Monday and Tuesday (2 breaks), medium Wednesday and Thursday (3), hard Friday and Saturday (4), brutal Sunday (5). Each weekday has a theme: Web Wednesday, Docking Bay 9 on Thursdays and Sundays, Nan's Kitchen on Mondays and Fridays, and Night Rooftops on Tuesdays and Saturdays.
- **Stats.** Played, streak, best streak, average points, and a points-per-day histogram. All stored locally.
- **The designer's run.** Once you're done, watch the level's intended solution play out.
- **Archive** of past days (unranked) and **practice** pages.
- **Same puzzle for everyone.** Phones show it as a portrait page. Desktops and tablets show it as the centre column of a landscape page, with themed scenery either side (`?layout=portrait|landscape` forces one).

**Global stats (optional).** `server/` holds a small Cloudflare Worker that counts anonymous daily scores, so players see "1,234 played today · avg 280 pts · you beat 64%". To switch it on:
1. Make a free Cloudflare account. Then run `npm i -g wrangler` and `wrangler login`.
2. In `server/`, run `wrangler kv namespace create SCORES` and paste the id it prints into `wrangler.toml`.
3. Run `wrangler deploy` and copy the `https://tab-hopper-stats.<you>.workers.dev` URL into `STATS_API` near the top of `index.html`.

Until then the game hides that section.

- **Play:** open `index.html` (it loads `sim.js`, `levels.js`, `sites.js`, `themes.js`, `sites.css` and `themes.css` from the same folder). Works on GitHub Pages. `?level=N` opens a specific page for practice.
- **Physics:** `sim.js` is a small fixed-timestep engine that uses only arithmetic and square roots, so every browser and the level generator compute the same ball path.
- **Levels:** `tools/generate.js` builds `levels.js` (365 daily pages). For each one it:
  1. finds a layout where 2–3 elements carry the ball into the goal, every one of them is needed, and the solution still works with any piece nudged 4 px;
  2. drops 3–5 coins along that path, re-checking the nudge tolerance with the coins required;
  3. adds clutter that doesn't break it or cover a coin, with no overlapping elements;
  4. breaks it with 2–5 moves (knock a ramp away, drop a pop-up/ad/cookie banner in the path, close the chat), leaving slack in the 6-move budget;
  5. checks that the broken page can't reach the New Tab at all, and that no single action gives a perfect run.

  Regenerate with `node tools/generate.js 420 20261118` (60 weeks in the weekly 2,2,3,3,4,4,5 mix, about 2 minutes).
- **Daily number:** #1 = 18 Nov 2026, from the local date. Best daily results are saved in localStorage.
