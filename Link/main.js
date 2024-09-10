;(() => {
	"use strict";
	(() => {
		const textarea = document.querySelector("#textarea");
		const anchor = document.querySelector("#anchor");
		textarea.oninput = () => {
			const url = textarea.value;
			anchor.href = url;
			anchor.innerText = url;
		};
	})``;
})``;
