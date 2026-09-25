const CACHE_NAME = 'mww-cache-v4';
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
