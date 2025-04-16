const CACHE_NAME = 'memory-v1'; // Cambia versione se aggiorni i file

self.addEventListener("install", event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll([
                '/',
                '/js/memory.js',
                '/css/input.css',
                '/css/memory.css',
            ]);
            self.skipWaiting();
        })()
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                          .map(name => caches.delete(name))
            );
            self.clients.claim();
        })()
    );
});

self.addEventListener("fetch", event => {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        try {
          const fetchResponse = await fetch(event.request);
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          if (event.request.mode === 'navigate') {
            return new Response(
              `<h1>Sei offline</h1><p>Controlla la tua connessione a Internet.</p>`,
              { headers: { 'Content-Type': 'text/html' } }
            );
          }
          return new Response('', { status: 503, statusText: 'Offline' });
        }
      }
    })());
  });
  
