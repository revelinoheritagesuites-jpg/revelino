import { isAuthed, json } from '../_auth.js';
export async function onRequestPost({ request, env }) {
  if (!(await isAuthed(request, env))) return json({ error: 'Niste prijavljeni.' }, 401);
  const buf = await request.arrayBuffer();
  if (buf.byteLength > 20e6) return json({ error: 'Fotografija je prevelika.' }, 413);
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  await env.REVELINO.put('img:' + id, buf, { metadata: { type: request.headers.get('Content-Type') || 'image/jpeg' } });
  return json({ url: '/api/img/' + id });
}
