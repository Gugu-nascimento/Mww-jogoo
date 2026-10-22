const CACHE_VERSION = 'v6'; // deixa v6 agora, muda pra v7 na próxima
const CACHE_NAME = `mww-cache-${CACHE_VERSION}`;

const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  './Icone.png',
  './CMPunk.mp3',
  './CodyRhodes.mp3',
  './SoloSikoa.mp3',
  './temawwe1.mp3',
  './temawwe2.mp3',
  './trickwillians.mp3'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // força atualizar na hora
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
