const cacheName = "Github_main";
const urls = [
	"index.html"
];
const caching = () => {
	return new Promise(async (resolve) => {
		try {
			const cache = await caches.open(cacheName);
			await cache.addAll(urls);
			resolve();
		} catch (error) {
			resolve(error);
		}
	});
};
const getCache = (request) => {
	return new Promise(async (resolve) => {
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
		} finally {
			resolve(response);
		}
	});
};
self.addEventListener("install", (event) => {
	event.waitUntil((async () => {
		await caching();
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
		return await getCache(event.request);
	})``);
});
