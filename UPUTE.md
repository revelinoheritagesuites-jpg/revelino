# Revelino – postavljanje na Cloudflare Pages

1. Na GitHub napravite novi (privatni) repozitorij i učitajte sve datoteke iz ove mape.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → odaberite repozitorij.
   Build command: (ostaviti prazno) · Build output directory: `/`
3. Cloudflare → Storage & databases → KV → Create namespace, naziv `revelino`.
4. Projekt → Settings → Bindings → Add → KV namespace: variable name `REVELINO`, odaberite `revelino`.
5. Projekt → Settings → Variables and Secrets → dodajte `ADMIN_USER` (korisničko ime) i `ADMIN_PASS` (jaka lozinka, 12+ znakova).
6. Napravite novi deploy (Deployments → Retry) da postavke stupe na snagu.
7. Custom domains → Set up a custom domain → `revelino.hr` (i `www.revelino.hr`).
8. Administracija: https://revelino.hr/admin
