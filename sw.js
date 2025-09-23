/* minimal SW: caches shell and enables offline install */
const CACHE = 'headlinecopy-v1';
const FILES = [
  '/', '/index.html', '/manifest.json'
  // add icons paths if hosted, e.g. '/icons/icon-192.png'
];

self.addEventListener('install', evt=>{
  evt.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', evt=>{
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt=>{
  // basic network-first for pages, cache fallback
  evt.respondWith(
    fetch(evt.request).catch(()=>caches.match(evt.request))
  );
});
