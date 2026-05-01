/**
 * SERVICE WORKER - AL FURQON FUNDRAISER APP
 * Architect: Avril auto
 */

// ⚠️ WAJIB UBAH ANGKA INI SETIAP KALI KAKAK UPDATE KODE HTML/JS DI GITHUB
// Misal besok update lagi, ubah jadi 'alfurqon-v3', dst.
const CACHE_NAME = 'alfurqon-v2'; 

const assets = [
  './',
  './index.html',
  'https://i.ibb.co.com/tT4X06X8/logo-fundraiser-alfurqon.png'
];

// 1. Tahap Install: Simpan aset terbaru & paksa langsung aktif
self.addEventListener('install', event => {
  self.skipWaiting(); // Memaksa Service Worker baru untuk langsung mengambil alih
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// 2. Tahap Activate: PENTING! Sapu bersih cache versi lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // Jika nama cache tidak sama dengan yang baru, HAPUS!
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Tahap Fetch: Mengambil data dengan strategi yang aman
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
