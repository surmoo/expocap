const CACHE = 'expocap-v5'; // Поменял версию кэша, чтобы телефон обновил файлы
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './jszip.min.js', // <-- Теперь библиотека качается в память телефона
  './sw.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
