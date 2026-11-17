import { isAuthed, json } from '../_auth.js';
export async function onRequestGet({ request, env }) {
  const c = await env.REVELINO.get('content');
  if (c) return new Response(c, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } });
  return Response.redirect(new URL('/content-default.json', request.url), 302);
}
export async function onRequestPut({ request, env }) {
  if (!(await isAuthed(request, env))) return json({ error: 'Niste prijavljeni.' }, 401);
  const body = await request.text();
  try { JSON.parse(body); } catch { return json({ error: 'Neispravni podaci.' }, 400); }
  await env.REVELINO.put('content', body);
  return json({ ok: true });
}
