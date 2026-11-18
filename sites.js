// The fake websites Tab-Hopper levels take place on. Purely visual: none of this is solid.
// All site names, people and brands are invented.
window.TAB_SITES = [
{
  id: 'news', fav: '📰', color: '#b3001b',
  tab: 'Man spends 40 minutes closing pop-ups | The Daily Scroll',
  host: 'www.thedailyscroll.news', path: '/technology/2026/nov/18/pop-ups-man-forgets-why',
  html: `<div class="t-news">
  <div class="n-top"><span>Wednesday 18 November 2026</span><span>Subscribe&nbsp;&nbsp;·&nbsp;&nbsp;Sign in</span></div>
  <div class="n-mast">The Daily Scroll</div>
  <div class="n-nav"><span>News</span><span>World</span><span>Business</span><span>Tech</span><span>Sport</span><span>Opinion</span></div>
  <div class="n-live"><b>LIVE</b>Cookie consent talks enter their third week</div>
  <div class="n-body">
    <div class="kicker">TECHNOLOGY</div>
    <h1>Man spends 40 minutes closing pop-ups, forgets what he came for</h1>
    <div class="by">By <u>Priya Nandakumar</u>, Technology correspondent · 4 min read</div>
    <figure><svg viewBox="0 0 336 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="nsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e98d5a"/><stop offset=".7" stop-color="#f6c99a"/><stop offset="1" stop-color="#f9e2c4"/></linearGradient></defs><rect width="336" height="120" fill="url(#nsk)"/><circle cx="238" cy="64" r="20" fill="#fff1d0" opacity=".85"/><g fill="#7a5f7d"><rect x="0" y="62" width="34" height="58"/><rect x="40" y="44" width="26" height="76"/><rect x="72" y="70" width="40" height="50"/><rect x="190" y="52" width="30" height="68"/><rect x="262" y="40" width="22" height="80"/><rect x="290" y="66" width="46" height="54"/></g><g fill="#4b3a57"><rect x="18" y="80" width="30" height="40"/><rect x="104" y="36" width="34" height="84"/><rect x="146" y="60" width="38" height="60"/><rect x="226" y="74" width="34" height="46"/><rect x="306" y="84" width="30" height="36"/></g><g fill="#ffd98a" opacity=".85"><rect x="110" y="44" width="4" height="5"/><rect x="120" y="44" width="4" height="5"/><rect x="128" y="56" width="4" height="5"/><rect x="110" y="68" width="4" height="5"/><rect x="154" y="70" width="4" height="5"/><rect x="166" y="82" width="4" height="5"/><rect x="232" y="84" width="4" height="5"/><rect x="246" y="96" width="4" height="5"/></g></svg><figcaption>The website in question, pictured shortly before its ninth newsletter offer. Photograph: Daily Scroll</figcaption></figure>
    <p class="dc">A Surrey man who opened a news article on Tuesday morning was still dismissing notifications at lunchtime, his family has confirmed.</p>
    <p>“I just wanted to see the weather,” said Graham Pettigrew, 52. “Then it asked if I wanted to subscribe. Then it asked again, but bigger.”</p>
    <p>Industry figures suggest the average web page now carries more pop-ups than paragraphs, a milestone experts describe as “inevitable, honestly”.</p>
    <div class="mostread"><h3>Most read</h3><ol><li>Nation agrees to “just accept all” in landmark vote</li><li>Seagull steals entire pasty in front of council meeting</li><li>Why your kettle has a privacy policy now</li></ol></div>
  </div></div>`,
  popups: [
    { h: 'Don’t miss a story', b: 'Get the morning briefing in your inbox, free.', cta: 'Sign up', no: 'No thanks, I prefer being uninformed' },
    { h: 'You’ve read 3 of 3 free articles', b: 'Subscribe for £1 a week. Cancel anytime.*', cta: 'Subscribe', no: '*Terms and conditions apply' },
    { h: 'Turn on notifications?', b: 'Be the first to know when anything happens, anywhere.', cta: 'Allow', no: 'Maybe later' }
  ],
  chat: { name: 'Daily Scroll Support', msg: 'Hi! Are you enjoying your 3 free articles?' }
},
{
  id: 'recipe', fav: '🍋', color: '#c2185b',
  tab: 'The BEST Lemon Drizzle Cake (My Nan’s Secret Recipe!) – Crumbs & Confessions',
  host: 'crumbsandconfessions.blog', path: '/best-lemon-drizzle-cake-nans-secret/',
  html: `<div class="t-rec">
  <div class="r-head"><span class="r-logo">Crumbs &amp; Confessions</span><span class="r-menu">☰</span></div>
  <div class="r-nav">Recipes · Baking · Dinners · About me · Shop</div>
  <div class="r-body">
    <div class="r-crumb">Home › Baking › Cakes › Loaf cakes</div>
    <h1>The BEST Lemon Drizzle Cake (My Nan’s Secret Recipe!)</h1>
    <div class="r-meta"><span class="stars">★★★★★</span> 4.9 from 2,481 reviews &nbsp;<span class="r-btn">Jump to recipe ↓</span></div>
    <div class="r-by">By Hattie · Updated 3 days ago · This post may contain affiliate links.</div>
    <figure><svg viewBox="0 0 336 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="rwd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e3d3"/><stop offset="1" stop-color="#d8b894"/></linearGradient><linearGradient id="rck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5d27e"/><stop offset="1" stop-color="#c98a3d"/></linearGradient></defs><rect width="336" height="120" fill="url(#rwd)"/><g stroke="#c9a57d" stroke-width="1" opacity=".5"><path d="M0 30h336M0 62h336M0 94h336"/></g><ellipse cx="168" cy="96" rx="118" ry="16" fill="#fff" stroke="#e7dccf"/><rect x="88" y="44" width="160" height="50" rx="10" fill="url(#rck)"/><path d="M90 52 q8-14 30-12 q12 18 18 2 q16-10 34 0 q8 16 16 0 q18-8 30 2 q8 14 14-2 q12 -4 16 8 v-6 q-10-14-158 0z" fill="#fffaf0"/><g fill="#fff36a" stroke="#e8c400"><circle cx="128" cy="40" r="9"/><circle cx="172" cy="38" r="9"/><circle cx="214" cy="41" r="9"/></g><g stroke="#fffbe0" stroke-width="1.2"><path d="M128 31v18M119 40h18M172 29v18M163 38h18M214 32v18M205 41h18"/></g><circle cx="290" cy="40" r="16" fill="#fff36a" stroke="#e8c400"/><path d="M22 20l18 70" stroke="#9e9e9e" stroke-width="5" stroke-linecap="round"/></svg></figure>
    <p>Before we get to the cake, I need to tell you about the summer of 2009. It was a Tuesday, the kind of Tuesday that smells of cut grass and possibility, and my nan was standing in her kitchen in Margate…</p>
    <p>She never measured anything. “A cup of this, a feeling of that,” she’d say. It took me eleven years and four ruined ovens to write it down.</p>
    <h2>Why you’ll love this recipe</h2>
    <ul><li>One bowl, no fuss</li><li>Ready in about an hour</li><li>Nan-approved (posthumously)</li></ul>
    <div class="r-card"><b>Ingredients</b><br>225g unsalted butter, softened · 225g caster sugar · 4 eggs · zest of 1 lemon · 225g self-raising flour</div>
  </div></div>`,
  popups: [
    { h: 'Get my FREE e-cookbook!', b: '30 family bakes plus Nan’s secret icing.', cta: 'Send it', no: 'No thanks, I don’t like cake' },
    { h: 'Wait! Before you go…', b: 'Join 80,000 home bakers. One email a week.', cta: 'Join', no: 'I’ll bake alone, thanks' },
    { h: 'Rate this recipe!', b: 'You haven’t made it yet, but rate it anyway.', cta: '★★★★★', no: 'Not now' }
  ],
  chat: { name: 'Hattie’s Kitchen 🍋', msg: 'Hi! Want the recipe? Scroll down a bit… then a bit more.' }
},
{
  id: 'forum', fav: '🫖', color: '#36578a',
  tab: 'Does anyone actually read the cookie banner? - KettleHead Forums',
  host: 'forums.kettlehead.org', path: '/showthread.php?t=88213',
  html: `<div class="t-forum">
  <div class="f-head">KettleHead Forums<small>The UK’s friendliest kettle community · est. 2003</small></div>
  <div class="f-nav">Home | FAQ | Members | Calendar | Search | Today’s Posts</div>
  <div class="f-crumb">KettleHead Forums › General Chat › Off Topic</div>
  <div class="f-thread">Thread: Does anyone actually read the cookie banner?</div>
  <div class="f-post"><div class="f-meta"><span>17-11-2026, 09:14 PM</span><span>#1</span></div><div class="f-row"><div class="f-user"><div class="f-av">🧔</div><b>bramble_dave</b><span>Senior Member</span><span>Join Date: Mar 2006</span><span>Posts: 4,812</span></div><div class="f-text">Genuine question. I just click accept on everything. Have I signed my house away??<div class="f-sig">Dave’s Kettle Restorations · est. 2004 · <u>pm me</u></div></div></div></div>
  <div class="f-post"><div class="f-meta"><span>17-11-2026, 09:31 PM</span><span>#2</span></div><div class="f-row"><div class="f-user"><div class="f-av">👵</div><b>Mags_Teasmade</b><span>Moderator</span><span>Join Date: Jan 2004</span><span>Posts: 21,077</span></div><div class="f-text"><div class="f-quote"><i>Quote: Originally Posted by bramble_dave</i>Have I signed my house away??</div>Yes. You now own 847 partners. Congratulations Dave.</div></div></div>
  <div class="f-post"><div class="f-meta"><span>18-11-2026, 07:02 AM</span><span>#3</span></div><div class="f-row"><div class="f-user"><div class="f-av">🐱</div><b>limescale_lad</b><span>Junior Member</span><span>Join Date: Oct 2026</span><span>Posts: 3</span></div><div class="f-text">first time poster. how do i get rid of the popup on this site lol</div></div></div>
  </div>`,
  popups: [
    { h: 'Register now — it’s free!', b: 'Members see fewer ads and can reply to threads.', cta: 'Register', no: 'Continue as guest' },
    { h: 'Was this thread helpful?', b: 'Rate it to help other kettle enthusiasts.', cta: 'Rate', no: 'Close' },
    { h: 'You have 1 new private message', b: 'From: bramble_dave. Subject: re: re: re: kettle', cta: 'Read', no: 'Later' }
  ],
  chat: { name: 'KettleBot 3000', msg: 'HELLO. HAVE YOU DESCALED TODAY.' }
},
{
  id: 'shop', fav: '🛒', color: '#e8590c',
  tab: 'Ergonomic Banana Hanger, Pack of 2 : Kitchen & Home | Bargainville',
  host: 'www.bargainville.shop', path: '/dp/B0NANA42/ref=sr_1_3?keywords=banana',
  html: `<div class="t-shop">
  <div class="s-head"><span class="s-logo">bargainville</span><span class="s-search">Search 4 million deals…</span><span class="s-cart">🛒<sup>3</sup></span></div>
  <div class="s-deal">⚡ FLASH SALE ends in 00:14:59</div>
  <div class="s-crumb">Home › Kitchen › Fruit Storage › Banana Hangers</div>
  <div class="s-img"><svg viewBox="0 0 336 140" preserveAspectRatio="xMidYMid meet"><rect width="336" height="140" fill="#fafafa"/><ellipse cx="168" cy="122" rx="64" ry="9" fill="#c49a6c"/><rect x="164" y="30" width="8" height="92" rx="3" fill="#b5895a"/><path d="M168 32 q34 -6 34 22" fill="none" stroke="#8d8d8d" stroke-width="4" stroke-linecap="round"/><g fill="#ffd93b" stroke="#c9a400" stroke-width="1.5"><path d="M202 56 q-30 10 -36 50 q12 -22 40 -38z"/><path d="M204 56 q-14 18 -6 56 q4 -26 14 -42z"/><path d="M206 56 q4 22 26 48 q-10 -28 -14 -44z"/><path d="M204 56 q18 10 30 36 q-4 -24 -18 -36z"/></g><rect x="198" y="50" width="10" height="9" rx="2" fill="#6b5a2a"/><text x="20" y="24" font-family="Arial" font-size="10" fill="#b12704">BESTSELLER</text></svg></div>
  <h1>Ergonomic Banana Hanger, Pack of 2 – Keeps Bananas Fresher Longer!! Bamboo, Easy Assembly</h1>
  <div class="s-stars">★★★★☆ <u>1,207 ratings</u> | <u>54 answered questions</u></div>
  <div class="s-price"><span class="now">£12.99</span> <s>RRP £24.99</s> <span class="save">Save 48%</span></div>
  <div class="s-stock">Only 3 left in stock – order soon. 47 people are viewing this.</div>
  <div class="s-btns"><span class="s-add">Add to Basket</span><span class="s-buy">Buy Now</span></div>
  <ul class="s-bul"><li>PREMIUM BAMBOO: sustainably sourced, mostly</li><li>FRESHER BANANAS: up to 2 extra days of banana*</li><li>WHAT YOU GET: 2 hangers, 1 instruction sheet (Swedish)</li></ul>
  <div class="s-rev"><h3>Customer reviews</h3>
    <div class="s-r"><b>★★★★★ Life changing</b><span>Reviewed in the UK on 2 November 2026 · Verified Purchase</span>My bananas have never been so well rested. Bought a third one for the cat.</div>
    <div class="s-r"><b>★★☆☆☆ Not as pictured</b><span>Reviewed in the UK on 29 October 2026 · Verified Purchase</span>Arrived without bananas. Seller says bananas “not included”. Feel misled.</div>
    <div class="s-r"><b>★★★★☆ Does what it says</b><span>Reviewed in the UK on 12 October 2026</span>It hangs bananas. Instructions were in Swedish but the bananas understood.</div>
  </div>
  </div>`,
  popups: [
    { h: 'Wait! Here’s 10% off', b: 'Enter your email for an exclusive code.', cta: 'Get code', no: 'No thanks, I’ll pay full price' },
    { h: 'Your basket misses you', b: '3 items are waiting. Prices may change!', cta: 'Checkout', no: 'Keep browsing' },
    { h: 'Spin to win!', b: 'Everyone’s a winner. Mostly of a newsletter.', cta: 'Spin', no: 'I don’t like winning' }
  ],
  chat: { name: 'Bargainville Help', msg: 'Psst. Customers who viewed this also viewed… more bananas.' }
},
{
  id: 'tech', fav: '📱', color: '#00a693',
  tab: 'I tested 47 phone cases so you don’t have to | Gadget Grumble',
  host: 'www.gadgetgrumble.net', path: '/reviews/best-phone-cases-tested-47',
  html: `<div class="t-tech">
  <div class="g-head"><span class="g-logo">gadget<b>grumble</b></span><span>Reviews · Deals · How-to · Podcast</span></div>
  <div class="g-body">
    <span class="g-tag">REVIEWS</span>
    <h1>I tested 47 phone cases so you don’t have to</h1>
    <div class="g-auth"><span class="g-av"></span><div><b>Marcus Oyelaran</b><br>Senior Reviews Editor · 18 Nov 2026 · Updated 2 hrs ago</div></div>
    <figure><svg viewBox="0 0 336 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="gbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfe9f3"/><stop offset="1" stop-color="#b8c7d9"/></linearGradient></defs><rect width="336" height="120" fill="url(#gbg)"/><g transform="rotate(-12 110 64)"><rect x="80" y="16" width="56" height="104" rx="12" fill="#ff6b6b"/><rect x="86" y="22" width="44" height="92" rx="8" fill="#1d1d24"/></g><rect x="142" y="10" width="56" height="106" rx="12" fill="#2f3542"/><rect x="148" y="16" width="44" height="94" rx="8" fill="#14141a"/><circle cx="170" cy="26" r="3" fill="#333"/><g transform="rotate(10 230 64)"><rect x="204" y="16" width="56" height="104" rx="14" fill="#7bed9f" stroke="#2ed573" stroke-width="4"/><rect x="212" y="24" width="40" height="88" rx="8" fill="#1d1d24"/></g></svg></figure>
    <p>Here’s the thing nobody tells you about phone cases: most of them are fine. I know, I know. But I have 47 of them in a drawer now, so we’re doing this properly.</p>
    <h2>1. The Brick (best overall)</h2>
    <p>It survived a drop from a second-floor window, a toddler, and my editor. It also weighs as much as a small melon.</p>
    <div class="g-verdict"><b>Verdict:</b> Buy it if you drop things. Don’t if you own pockets.</div>
    <h2>2. The Wallet (best for people who lose cards)</h2>
    <p>Holds three cards, a fiver and, in my case, a single loyalty card for a café that closed in 2019. The magnetic clasp works until it absolutely doesn’t.</p>
    <h2>3. The Clear One (best if you like yellowing)</h2>
    <p>Crystal clear for about nine days. Then a gentle, nicotine-ish tint sets in, like a pub ceiling in 1994.</p>
    <div class="g-rel"><b>RELATED</b> · The best chargers for phones you already own · Is your toaster spying on you?</div>
  </div></div>`,
  popups: [
    { h: 'Join the Grumble', b: 'The best deals, zero grumbling. Weekly.', cta: 'Subscribe', no: 'No thanks' },
    { h: 'Ad blocker detected', b: 'We rely on ads to keep the lights on. Please allow us.', cta: 'Allow ads', no: 'Continue anyway' },
    { h: 'Black Friday came early!', b: 'Our top 312 deals, ranked by vibes.', cta: 'See deals', no: 'I’ll wait for Friday' }
  ],
  chat: { name: 'Grumble Assistant', msg: 'Hi! Want me to recommend a case? (It’s the Brick.)' }
}];

// Shared clutter copy, used on every site.
window.TAB_ADS = [
  { h: 'Dentists don’t want you to know this one trick', s: 'SmileHacks', th: '🦷', bg: 'linear-gradient(135deg,#d7eef7,#9fd0e6)' },
  { h: 'Locals are furious about this new mortgage rule', s: 'MoneyWiseDaily', th: '🏡', bg: 'linear-gradient(135deg,#f5e3cf,#ddb894)' },
  { h: 'This £4 gadget makes your old kettle “smart”', s: 'TechTrendz', th: '☕', bg: 'linear-gradient(135deg,#eee,#c9c9c9)' },
  { h: 'Celebs who aged terribly (No. 7 will shock you)', s: 'GlamBuzz', th: '⭐', bg: 'linear-gradient(135deg,#fbe0ec,#e9a8c4)' },
  { h: 'Doctors baffled: 63-year-old looks 25', s: 'HealthSecrets', th: '💊', bg: 'linear-gradient(135deg,#e1f5e1,#a8d8a8)' },
  { h: 'You won’t believe what this beach looks like now', s: 'TravelTwist', th: '🏝️', bg: 'linear-gradient(135deg,#d6ecff,#8fc3f0)' }
];
window.TAB_TOASTS = [
  { i: '✉️', t: 'Mail', b: '3 new messages from Mum' },
  { i: '📦', t: 'ParcelPal', b: 'Your parcel is out for delivery' },
  { i: '🔋', t: 'Low battery', b: '4% remaining. Plug in soon.' },
  { i: '📅', t: 'Calendar', b: 'Dentist in 15 minutes' },
  { i: '⬇️', t: 'Downloads', b: 'invoice_FINAL(3).pdf complete' },
  { i: '💬', t: 'Family group', b: 'Dad: how do i make the text bigger' },
  { i: '🔄', t: 'Software Update', b: 'Restart required. Remind me in 1 hr?' }
];
window.TAB_NOTES = ['buy milk', 'call mum back!!', 'drink water', 'ship it', 'fix bug #4', 'pw: hunter2', 'gym?? lol', 'reply to Dave', 'TODO: sleep', 'water plants', 'bins out WEDS'];
