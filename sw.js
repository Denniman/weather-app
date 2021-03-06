const staticCacheName = 'site-static-v8';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/css/style.css',
    '/image/Beautiful-Norway.jpg',
    '/image/apple-icon-152x152.png',
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Roboto&display=swap',

];
// install service worker
self.addEventListener('install', e => {
    e.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
        cache.addAll(assets);
    })
    );
    
})

// actvate service worker
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
        .then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

// listen of fetch event
self.addEventListener('fetch', e => {
    // console.log('fetch event', e);
    e.respondWith(
        caches.match(e.request)
        .then(cachRes => {
            return cachRes || fetch(e.request);
        })
    );
})

