import { isAuthed, json } from '../../_auth.js';
export async function onRequestGet({ params, env }) {
  const { value, metadata } = await env.REVELINO.getWithMetadata('img:' + params.id, 'arrayBuffer');
  if (!value) return new Response('Not found', { status: 404 });
  return new Response(value, { headers: { 'Content-Type': metadata?.type || 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable' } });
}
export async function onRequestDelete({ request, params, env }) {
  if (!(await isAuthed(request, env))) return json({ error: 'Niste prijavljeni.' }, 401);
  await env.REVELINO.delete('img:' + params.id);
  return json({ ok: true });
}
