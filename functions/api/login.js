import { makeToken, isAuthed, json } from '../_auth.js';
export async function onRequestPost({ request, env }) {
  const { user, pass } = await request.json().catch(() => ({}));
  if (!env.ADMIN_USER || !env.ADMIN_PASS) return json({ error: 'Lozinka nije postavljena u Cloudflareu.' }, 500);
  if (user !== env.ADMIN_USER || pass !== env.ADMIN_PASS) { await new Promise(r => setTimeout(r, 800)); return json({ error: 'Pogrešno korisničko ime ili lozinka.' }, 401); }
  const t = await makeToken(env);
  return json({ ok: true }, 200, { 'Set-Cookie': `rv=${t}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800` });
}
export async function onRequestDelete() {
  return json({ ok: true }, 200, { 'Set-Cookie': 'rv=; Path=/; Max-Age=0' });
}
export async function onRequestGet({ request, env }) {
  return (await isAuthed(request, env)) ? json({ ok: true }) : json({ ok: false }, 401);
}
