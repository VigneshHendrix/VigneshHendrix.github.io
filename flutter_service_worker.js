'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "303cd6bc4e3df3332580dfa66c1a06fb",
"assets/assets/fonts/GoogleSansRegular.ttf": "b5c77a6aed75cdad9489effd0d5ea411",
"assets/assets/fonts/Product-Sans-Regular.ttf": "eae9c18cee82a8a1a52e654911f8fe83",
"assets/assets/Images/C++.png": "e0df5bbfe552550f05bc78bb1785f144",
"assets/assets/Images/C.png": "76927431573bd65f2639c44eb0087fe6",
"assets/assets/Images/cutpor.png": "d2e1de7e2e6ebd4444d4b7bd13c4bb34",
"assets/assets/Images/darticon.png": "c979b430b2da155059ebc0a22b0a26ac",
"assets/assets/Images/figma.png": "c7348c3737b9d6bd8c83b4bd46e7af81",
"assets/assets/Images/final.png": "cb6d5d5457af6cba8f7584f9f50f671f",
"assets/assets/Images/final2.png": "5037f0528e38efc6289d56b79480a9b4",
"assets/assets/Images/Git.png": "fc46760a7052c108a808a96af69ad80a",
"assets/assets/Images/github.png": "d22ee3727a7216019c3848df6eafa024",
"assets/assets/Images/gmail.png": "8cf6b70c11f86433fb4713b5bb00aa48",
"assets/assets/Images/instagram.png": "8290266a5fb402a34b96f890bbdb2d60",
"assets/assets/Images/macclear.jpeg": "6ec903b930d8a35f1b8be7a716def00c",
"assets/assets/Images/marklang.png": "e4a6ca229703c62f03e554bcd66319b4",
"assets/assets/Images/marklang1.png": "e3fcd3e64f6683f7b664797ab66149d2",
"assets/assets/Images/mechshare.jpeg": "c3c64df6c3ec737bd1cd141cb0942ab5",
"assets/assets/Images/moon.png": "a270b8a10d1a9a52441bf5a322dd1b86",
"assets/assets/Images/mysqldb.png": "69db6e0d5319a0fb747ff959313794a3",
"assets/assets/Images/mysqldol.png": "648217535db9e78fe4b51af26c7de7aa",
"assets/assets/Images/offshare.jpeg": "e23f890dc2d257bcc6ad2bf330afd249",
"assets/assets/Images/offsharen.jpeg": "6825b1d909f1c06e0d44c2cd1f262edf",
"assets/assets/Images/playstore%2520(1).png": "9d0f820444df6db772d06ee5b230789e",
"assets/assets/Images/playstore.png": "18fab95d924ef304111a8efd2620c0a6",
"assets/assets/Images/profile-user.png": "5700c04197ee9a4372a35ef16eb78f4e",
"assets/assets/Images/progithub.png": "8a116e0acf74c73dcee645dae9687ec8",
"assets/assets/Images/rocket.png": "b55f5e2aba3534362c651bf6c79a941d",
"assets/assets/Images/shareicon.png": "a9d5c5e019daebb7c98bd796bd4551e9",
"assets/assets/Images/skill.png": "b8c221b99853337c9a31ab2d4a23d827",
"assets/assets/Images/trophy.png": "d0353c7a54a06f7092be59622c089d39",
"assets/FontManifest.json": "d57f1ec3bd5fea29787790d5775e380c",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "d55d4fed69057e4ab9c241d10188b3b8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b14fcf3ee94e3ace300b192e9e7c8c5d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "831eb40a2d76095849ba4aecd4340f19",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "a126c025bab9a1b4d8ac5534af76a208",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "d80ca32233940ebadc5ae5372ccd67f9",
"icons/glassicon.jpg": "f04ecd26e6f97716221ceed0cfa3e72d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "47a3e80e4007c4f7f76f893fa9f3de76",
"/": "47a3e80e4007c4f7f76f893fa9f3de76",
"main.dart.js": "bdd43098a8757f60a859b20107f6b2bd",
"manifest.json": "5a2c0526f1fe73e6f211bc7a9d15c210",
"version.json": "426313f2f3133c2f20415344c4a22df3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
  for (var resourceKey in Object.keys(RESOURCES)) {
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
