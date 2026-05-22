/* ===================================
   sw.js — Service Worker
   Caches the app so it works offline
   Students: you don't need to edit this
   =================================== */

   const CACHE_NAME = 'my-app-v1';

   // Files to cache for offline use
   const FILES_TO_CACHE = [
     'index.html',
     'search.html',
     'activity.html',
     'profile.html',
     'styles.css',
     'manifest.json'
   ];
   
   // Install: cache all the files
   self.addEventListener('install', event => {
     event.waitUntil(
       caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
     );
     self.skipWaiting();
   });
   
   // Activate: clean up old caches
   self.addEventListener('activate', event => {
     event.waitUntil(
       caches.keys().then(keys =>
         Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
       )
     );
     self.clients.claim();
   });
   
   // Fetch: serve from cache, fall back to network
   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request).then(cached => cached || fetch(event.request))
     );
   });

  