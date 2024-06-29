self.addEventListener("install", () => {
	p.innerText = 1;
});

self.addEventListener('activate', () => {
	p.innerText = 2;
});
