const enc = new TextEncoder();
async function sign(env, msg) {
  const k = await crypto.subtle.importKey('raw', enc.encode(env.ADMIN_PASS + '|revelino'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const s = await crypto.subtle.sign('HMAC', k, enc.encode(msg));
  return [...new Uint8Array(s)].map(b => b.toString(16).padStart(2, '0')).join('');
}
export async function makeToken(env) { const exp = Date.now() + 7 * 864e5; return exp + '.' + await sign(env, '' + exp); }
export async function isAuthed(req, env) {
  const m = (req.headers.get('Cookie') || '').match(/rv=(\d+)\.([a-f0-9]+)/);
  if (!env.ADMIN_PASS || !m || +m[1] < Date.now()) return false;
  return m[2] === await sign(env, m[1]);
}
export const json = (o, s = 200, h = {}) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', ...h } });
