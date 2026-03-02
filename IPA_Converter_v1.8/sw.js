const cacheName = "IPA_v2";

const urls = [
	"index.html",
	"https://luecy.github.io/learning/fonts/NotoSans-Regular.ttf"
];

self.addEventListener("install", (event) => {
	event.waitUntil((async () => {
		const cache = await caches.open(cacheName);
		await cache.addAll(urls);
		skipWaiting();
	})``);
});

self.addEventListener("activate", (event) => {
	event.waitUntil((async () => {
		await clients.claim();
	})``);
});

self.addEventListener("fetch", async (event) => {
	event.respondWith((async () => {
		const request = event.request;
		let response;
		try {
			const cache = await caches.open(cacheName);
			response = await cache.match(request);
			if (!response) {
				await cache.add(request);
				response = await cache.match(request);
			}
		} catch {
			response = await fetch(request);
		}
		return response;
	})``);
});
