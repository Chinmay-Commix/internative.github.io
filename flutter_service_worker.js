'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/assets/builder.html": "5e53e380aab70f938bb32d53cf79013e",
"assets/assets/images/Vector.png": "b00b985c1f0b74ee8c937134f4c6e68b",
"assets/assets/images/Vector.svg": "48df0bb10d3eeea0fc57eb8bd63bb777",
"assets/assets/images/logo.png": "05341e5e65d750e1e3f86459f513deae",
"assets/assets/images/Rectangle%25202.png": "10deeaca3b12dd2c8f8409a85115549e",
"assets/assets/bgimage.png": "10deeaca3b12dd2c8f8409a85115549e",
"assets/assets/js/carbon-v2.js": "2fcc44870b0bd0a8e11f8ba111f9e8e7",
"assets/assets/js/grapes.min.js": "dfac366e489e843caf26d0c2f4246eb1",
"assets/assets/js/editor.js": "ba4dc95be70c26c2af2e3d12e8c83d2e",
"assets/assets/logo.png": "05341e5e65d750e1e3f86459f513deae",
"assets/assets/css/demos.css": "ca764fb84c1b28e1674f65516e3a6a1e",
"assets/assets/css/tooltip.css": "e897ed968ed4e414970d2561a2c44856",
"assets/assets/css/material.css": "a5d6718237c2c5ed02b1e512e086be72",
"assets/assets/css/grapes.min.css": "2b0b7120cb28b8ddc1cd4f3119b51631",
"assets/assets/jsons/dataaquire.json": "12e9c950de0b4992b04222454f6c4798",
"assets/assets/jsons/rengage.json": "7c5272aa05424a93406fd320610e7352",
"assets/assets/jsons/designBlock3.png": "384c8abffdcd61e9f4eb550bd5fb566a",
"assets/assets/jsons/smart_poll.json": "9a5798961e17558aa922bf1991079296",
"assets/assets/jsons/notification.json": "c22505247863138a9ea6abdc5f446c13",
"assets/assets/jsons/designBlock2.png": "b003850ddb03364cc3a9e22fef3be558",
"assets/assets/jsons/newsletter.json": "12e9c950de0b4992b04222454f6c4798",
"assets/assets/jsons/product_launch.json": "fe54f9aa4248d7eafe765e3cf0ee9bdd",
"assets/assets/jsons/fullBot.json": "4a1155b9b2cbf1cf0ae597f52cb7be62",
"assets/assets/jsons/designBlock1.png": "268d00aa7ac437adc3ce19e9cfa65a84",
"assets/assets/jsons/welcome.json": "23ccd3593feb203a3b1ffa66a212fd46",
"assets/AssetManifest.json": "cc7c72783e11772a0aaf34338a147d79",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/flutter_inappwebview/assets/web/web_support.js": "f04041d57436ede6bdcda9b904845a6b",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/NOTICES": "810d431c44ffd4e190ee3f20a58f2a50",
"assets/AssetManifest.bin": "c593b02a728d369c7fad1a000a948873",
"assets/fonts/MaterialIcons-Regular.otf": "80361381dd38d323482e62a09588794e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"index.html": "d8d8c6aa82fd1f303b227890d9f7eb45",
"/": "d8d8c6aa82fd1f303b227890d9f7eb45",
"main.dart.js": "1f761d6fd46e016f0a9008081e8ec162",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"manifest.json": "f78e729429944c5842103342a774b931",
"version.json": "a9c597c24267476424df3072b98cb381",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
