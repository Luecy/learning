const cacheName = "IPA_v1";

self.addEventListener("activate", (event) => {
	event.waitUntil((async () => {
		await clients.claim();
	})``);
});

self.addEventListener("message", async (event) => {
	try {
		const fontURL = event.data;
		const urls = [
			"index.html",
			fontURL
		];
		const cache = await caches.open(cacheName);
		await cache.addAll(urls);
		event.source.postMessage("success");
	} catch (error) {
		event.source.postMessage(error.message);
	}
});

self.addEventListener("fetch", async (event) => {
	event.respondWith((async () => {
		const cache = await caches.open(cacheName);
		return await cache.match(event.request.url);
	})``);
});
