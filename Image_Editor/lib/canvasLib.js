;(() => {
	"use strict";
	const name = "canvasLib.js";
	const canvasToBlob = (canvas) => {
		return new Promise((resolve) => {
			canvas.toBlob((blob) => {
				resolve(blob);
			});
		});
	};
	const canvasToURL = (canvas = document.querySelector("canvas"), mimeType = "image/png", qualityArgument = 0.85) => {
		return new Promise(resolve => {
			canvas.toBlob(blob => {
				const url = URL.createObjectURL(blob);
				resolve(url);
			}, mimeType, qualityArgument);
		});
	};
	const drawImagefileToCanvas = (file, canvas = document.querySelector("canvas"), width, height, x = 0, y = 0, resizeCanvas = true) => {
		return new Promise(resolve => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const image = new Image();
				image.src = reader.result;
				image.onload = () => {
					const context = canvas.getContext("2d");
					if (width == undefined) width = image.naturalWidth;
					if (height == undefined) height = image.naturalHeight;
					if (x == undefined) x = 0;
					if (y == undefined) y = 0;
					if (resizeCanvas) {
						canvas.width = width;
						canvas.height = height;
					}
					context.drawImage(image, x, y, width, height);
					resolve();
				};
			};
		});
	};
	const canvasToImageElement = (canvas) => {
		return new Promise((resolve) => {
			canvas.toBlob((blob) => {
				const reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onload = () => {
					const image = new Image();
					image.src = reader.result;
					image.onload = () => {
						resolve(image);
					};
				};
			});
		});
	};
	const rotateCanvas = async (canvas) => {
		const img = await canvasToImageElement(canvas);
		const context = canvas.getContext("2d");
		const width = canvas.width;
		const height = canvas.height;
		canvas.width = height;
		canvas.height = width;
		context.rotate((90 * Math.PI) / 180);
		context.translate(0, -height);
		context.drawImage(img, 0, 0, width, height);
	};
	const resize = async (canvas, width, height) => {
		if (!Number.isInteger(width) || width < 1) {
			return null;
		}
		if (!Number.isInteger(height) || height < 1) {
			return null;
		}
		{
			const blob = await canvasToBlob(canvas);
			await drawImagefileToCanvas(blob, canvas, width, height);
		}
	};
	const reverse = (canvas) => {
		const context = canvas.getContext("2d");
		const original = context.getImageData(0, 0, canvas.width, canvas.height);
		const reversed = context.createImageData(canvas.width, canvas.height);
		let a = 0;
		let b = canvas.width * 4 - 4;
		for (let i = 0; i < canvas.height; i++) {
			for (let i = 0; i < canvas.width; i++) {
				for (let i = 0; i < 4; i++) {
					reversed.data[b] = original.data[a];
					a++;
					b++;
				}
				b -= 8;
			}
			b = b + canvas.width * 4 * 2;
		}
		for (let i = 3; i < reversed.data.length; i+=4) {
			reversed.data[i] = 255;
		}
		context.putImageData(reversed, 0, 0);
	};
	const space = (() => {
		const check = (param) => {
			param = Number(param);
			if (!Number.isInteger(param) || param < 0) {
				param = 0;
			}
			return param;
		};
		return (canvas, left, right, top, bottom, background = "#000000ff") => {
			left = check(left);
			right = check(right);
			top = check(top);
			bottom = check(bottom);
			{
				const context = canvas.getContext("2d");
				const imgDat = context.getImageData(0, 0, canvas.width, canvas.height);
				canvas.width = canvas.width + left + right;
				canvas.height = canvas.height + top + bottom;
				context.fillStyle = background;
				context.fillRect(0, 0, canvas.width, canvas.height);
				context.putImageData(imgDat, left, top);
			}
		};
	})``;
	const cut = (canvas, left, right, top, bottom) => {
		const context = canvas.getContext("2d");
		const imgDat = context.getImageData(0, 0, canvas.width, canvas.height);
		canvas.width -= (left + right);
		canvas.height -= (top + bottom);
		context.putImageData(imgDat, -left, -top);
	};
	const enlarge = (() => {
		const asyncLoop = (() => {
			const sleep = (time = 0) => {
				return new Promise(resolve => {
					setTimeout(resolve, time);
				});
			};
			return async (func1, func2, num) => {
				await sleep();
				const n1 = Math.trunc(num / 100);
				const n2 = num % 100;
				let n3 = 0;
				for (let i1 = 0; i1 < 100; i1++) {
					for (let i2 = 0; i2 < n1; i2++) {
						func1();
					}
					if (n3 < n2) {
						func1();
						n3++;
					}
					func2();
					await sleep();
				}
			};
		})``;
		return async (canvas, ratio, func) => {
			const context = canvas.getContext("2d");
			const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
			if (!Number.isInteger(ratio) || ratio < 2) {
				return null;
			}
			canvas.width = canvas.width * ratio;
			canvas.height = canvas.height * ratio;
			{
				const num = imgData.data.length / 4;
				let x = 0, y = 0, n = 0;
				let per = 1;
				await asyncLoop(() => {
					const r = imgData.data[n++];
					const g = imgData.data[n++];
					const b = imgData.data[n++];
					const a = imgData.data[n++];
					context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
					context.fillRect(x, y, ratio, ratio);
					if (x < canvas.width - ratio) {
						x += ratio;
					}else {
						x = 0;
						y += ratio;
					}
				},
				() => {
					func(per);
					per++;
				}, num);
			}
		};
	})``;
	if (self.hasOwnProperty(name) === true) {
		throw new Error(`[self.${name}] is in conflict`);
	}
	self[name] = Object.freeze({
		canvasToBlob,
		canvasToURL,
		drawImagefileToCanvas,
		canvasToImageElement,
		rotateCanvas,
		resize,
		reverse,
		space,
		cut,
		enlarge
	});
	Object.defineProperty(self, name, {writable: false, configurable: false});
})``;
