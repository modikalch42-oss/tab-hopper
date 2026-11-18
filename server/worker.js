// Tab-Hopper global stats: a tiny Cloudflare Worker + KV store.
// POST /score  {day, k, n}  -> records one finished daily (k = coins banked, -1 = never reached the goal)
// GET  /stats?day=N         -> {players, hist, avg, perfectPct} for that day
// Anonymous by design: no names, no IDs, no IP addresses are stored.
// Note: KV has no atomic increments, so counts can be slightly off under heavy simultaneous traffic.
// That's fine for "how did everyone do" stats. Switch to a Durable Object if it ever matters.
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type' };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...CORS, 'content-type': 'application/json' } });
const blank = () => ({ players: 0, hist: {}, n: 0 });

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

    if (url.pathname === '/score' && req.method === 'POST') {
      const b = await req.json().catch(() => null);
      const day = b && Number(b.day), k = b && Number(b.k), n = b && Number(b.n);
      if (!Number.isInteger(day) || day < 1 || day > 100000 || !Number.isInteger(k) || k < -1 || k > 9 || !Number.isInteger(n) || n < 1 || n > 9 || k > n)
        return json({ error: 'bad score' }, 400);
      const key = 'day:' + day, cur = JSON.parse(await env.SCORES.get(key) || 'null') || blank();
      cur.players++; cur.hist[k] = (cur.hist[k] || 0) + 1; cur.n = n;
      await env.SCORES.put(key, JSON.stringify(cur));
      return json({ ok: true });
    }

    if (url.pathname === '/stats' && req.method === 'GET') {
      const day = Number(url.searchParams.get('day'));
      if (!Number.isInteger(day)) return json({ error: 'bad day' }, 400);
      const cur = JSON.parse(await env.SCORES.get('day:' + day) || 'null') || blank();
      let pts = 0; for (const [k, v] of Object.entries(cur.hist)) pts += Math.max(0, +k) * 100 * v;
      return json({ players: cur.players, hist: cur.hist, avg: cur.players ? Math.round(pts / cur.players) : 0,
        perfectPct: cur.players ? Math.round(100 * (cur.hist[cur.n] || 0) / cur.players) : 0 });
    }
    return json({ error: 'not found' }, 404);
  }
};
