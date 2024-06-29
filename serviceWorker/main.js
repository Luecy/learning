;(() => {
	"use strict";
	(async () => {
		if ("serviceWorker" in navigator) {
			const registration = await navigator.serviceWorker.register("./sw.js", {scope: "./"})
			if (registration.installing) {
				p.innerText = "installing";
			}else if (registration.waiting) {
				p.innerText = "waiting";
			}else if (registration.active) {
				p.innerText = "active";
			}
		}
	})``;
})``;
