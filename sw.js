const CACHE_NAME = 'alfurqon-v1';
const assets = [
  './',
  './index.html',
  'https://i.ibb.co.com/tT4X06X8/logo-fundraiser-alfurqon.png'
];

// Tahap Install: Menyimpan aset ke cache lokal
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Tahap Fetch: Mengambil data dari cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
