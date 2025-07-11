'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "283452aff3f32d3bf8a7eecfd6efd3dc",
"assets/AssetManifest.bin.json": "3d92c77b45a54bb168ce60aec6971b56",
"assets/AssetManifest.json": "09e89f68be62627f9aafca24645289de",
"assets/assets/hm.jpg": "4ea009aeff9caf0c84cb72bc2132fa4e",
"assets/assets/hmgok.jpg": "579d3ef21b4712dfd3ddd3d05625c59a",
"assets/assets/images/footer.jpg": "4c964dadc320436dc4bd659d116e4142",
"assets/assets/images/home.jpg": "811da5c652f6cec4ce9c4a6a194b96cc",
"assets/assets/images/logo.png": "94ae0bc52b5b0d448c4917dcaffd8c28",
"assets/assets/images/nav.jpg": "cf3b7253bc2f665ecbf1c857b50c6213",
"assets/assets/images/p1.jpg": "c44bfdb07bad1fcc6dd92f9620778812",
"assets/assets/images/pl2.jpg": "e055b33a96ae8426d81498b97e261182",
"assets/assets/images/pl3.jpg": "502d7966db4d6a576b843ac9b2361b23",
"assets/assets/images/pl4.jpg": "f0cea5647be92d38a11ec26c296edd08",
"assets/assets/images/saft.jpg": "ba5f70380d0473692729e9f77e739308",
"assets/assets/images/sl0.jpg": "ccd4f051a5b4bf31756f732f3b7dd9af",
"assets/assets/images/sl1.jpg": "579d3ef21b4712dfd3ddd3d05625c59a",
"assets/assets/images/sl2.jpg": "b63dc394fe314694608233e3641232d3",
"assets/assets/loader.gif": "bae2dce7c012c31c1f73d2108ba55d42",
"assets/assets/logo.png": "c2cabe54a6cc8ed538118f2922d3ee1e",
"assets/assets/logokm.png": "c2cabe54a6cc8ed538118f2922d3ee1e",
"assets/assets/lohu.png": "b7054f4241a6244e3bb11b88c5203ddd",
"assets/assets/pnding.json": "5c155ef537e313d0558565f560df4724",
"assets/assets/sbmenu.png": "c2cabe54a6cc8ed538118f2922d3ee1e",
"assets/assets/sucessful.json": "77803a6057dd4762500fa8ba14782159",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "a9598549df7838ac866ab97efdb1ab55",
"assets/NOTICES": "ddb62b1498716516789f12dfa97de4c3",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "6f756dfc5ec933ca256c903f5bc2ba20",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "0e076765a82c5df1572e95951f8efcb4",
"icons/Icon-192.png": "cfa9a0b55b90cc60108f56a2733ae39c",
"icons/Icon-512.png": "b6463946f4132c8f753d1d5e11032c0f",
"icons/Icon-maskable-192.png": "b6463946f4132c8f753d1d5e11032c0f",
"icons/Icon-maskable-512.png": "6f756dfc5ec933ca256c903f5bc2ba20",
"index.html": "2306269fd73eaa7262ca9a5514b66f8e",
"/": "2306269fd73eaa7262ca9a5514b66f8e",
"main.dart.js": "74b8724e77141403cca1b34b76eefff4",
"manifest.json": "740332bf0e64e415eb3947aff25aeede",
"MyCard.apk": "cc306f1408e6698e8ac944f9b02fe75b",
"version.json": "38cedf0aab7da90514d60d548a2fceb7"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
