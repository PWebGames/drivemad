const CACHE_NAME = "drivemad-v1";

const ASSETS = [
  "/drivemad/",
  "/drivemad/index.html",
  "/drivemad/Jump_Gamemonetize.js",
  "/drivemad/webapp/baloo2.woff",
  "/drivemad/webapp/cover.jpg",
  "/drivemad/webapp/e.html",
  "/drivemad/webapp/fancade.css",
  "/drivemad/webapp/index.data",
  "/drivemad/webapp/index.js",
  "/drivemad/webapp/index.wasm",
  "/drivemad/webapp/source_min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
