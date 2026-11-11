const V='meusjogos-v1',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.hostname.includes('steamstatic.com')){ // capas: guarda para ver offline
    e.respondWith(caches.open(V).then(async c=>{const m=await c.match(r);if(m)return m;try{const n=await fetch(r);c.put(r,n.clone());return n}catch(x){return Response.error()}}));return}
  if(u.origin===location.origin)e.respondWith(fetch(r).then(n=>{const cp=n.clone();caches.open(V).then(c=>c.put(r,cp));return n}).catch(()=>caches.match(r)));
});
