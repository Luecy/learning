;(() => {
	"use strict";
	
	//定義するメソッドの名前の一覧
	const methodNames = new Map([
		["self", ["defineProperty", "freezeProperty", "$", "sleep", "downloadFile", "download", "canvasToURL", "drawImagefileToCanvas"]],
		["Math", ["randomInt"]],
		["Blob.prototype", ["uint8Array", "dataURL"]],
		["String.prototype", ["atob", "btoa", "toUTF8", "toUTF16", "base16Decode", "normalizeNewline", "trimIndent"]],
		["Uint8Array.prototype", ["btoa", "text", "loop", "random", "base16Encode"]]
	]);
	
	//プロパティ名の競合を判定しプロパティの定義、凍結をする関数
	const defineProperty = (property, value, object = "self", writable = false, configurable = true, enumerable = true) => {
		const objectNameToObject = (objectName) => {
			const arr = objectName.split(".");
			let obj = self;
			for (const i of arr) {
				obj = obj[i];
			}
			return obj
		};
		const checkConflict = (objectName = "self", propertyName = [""]) => {
			if (typeof propertyName === "string") propertyName = [propertyName];
			const obj = objectNameToObject(objectName);
			for (const i of propertyName) {
				try {
					if (obj.hasOwnProperty(i) === true) {
						throw new Error(`[${objectName}.${i}] is in conflict`);
					}
				}catch (e) {
					console.error(e);
				}
			}
		};
		if (Array.isArray(property) === false) property = [property];
		if (Array.isArray(value) === false) value = [value];
		checkConflict(object, property);
		object = objectNameToObject(object);
		for (let i = 0; i < value.length; i++) {
			Object.defineProperty(object, property[i], {
				value: value[i],
				configurable: configurable,
				writable: writable,
				enumerable: enumerable
			});
		}
	};
	
	//定義するメソッドの一覧
	const methods = [
		
		defineProperty,
		
		//self.freezeProperty
		(property, object = self) => {
			if (typeof property === "string") property = [property];
			for (let i = 0; i < property.length; i++) {
				Object.defineProperty(object, property[i], {
					configurable: false,
					enumerable: true,
					writable: false
				});
			}
		},
		
		//self.$
		(selector) => {
			const element = document.querySelectorAll(selector);
			if (element.length === 1) return element[0];
			return element;
		},
		
		//self.sleep
		(time = 0) => {
			return new Promise(resolve => {
				setTimeout(resolve, time);
			});
		},
		
		//self.downloadFile
		(file, fileName = "00", anchor = document.querySelector("a")) => {
			if (toString.call(file) === "[object Uint8Array]") file = new Blob([file]);
			{
				const url = URL.createObjectURL(file);
				if (fileName == "") fileName = "00.txt";
				anchor.download = fileName;
				anchor.href = url;
				return url;
			}
		},
		
		//self.download
		(file, fileName = "00") => {
			const anchor = document.createElement("a");
			if (toString.call(file) === "[object Uint8Array]") file = new Blob([file]);
			{
				const url = URL.createObjectURL(file);
				anchor.href = url;
				anchor.download = fileName;
				anchor.click();
				URL.revokeObjectURL(url);
			}
		},
		
		//self.canvasToURL
		(canvas = document.querySelector("canvas"), mimeType = "image/png", qualityArgument = 0.85) => {
			return new Promise(resolve => {
				canvas.toBlob(blob => {
					const url = URL.createObjectURL(blob);
					resolve(url);
				}, mimeType, qualityArgument);
			});
		},
		
		//self.drawImagefileToCanvas
		(file, canvas = document.querySelector("canvas"), width, height, x = 0, y = 0, resizeCanvas = true) => {
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
		},
		
		//Math.randomInt
		(max = 255, min = 0) => {
			return Math.floor( Math.random() * (max - min + 1) + min );
		},
		
		//Blob.prototype.uint8Array
		async function() {
			const buffer = await this.arrayBuffer();
			return new Uint8Array(buffer);
		},
		
		
		//Blob.prototype.dataURL
		function() {
			return new Promise(resolve => {
				const reader = new FileReader();
				reader.readAsDataURL(this);
				reader.onload = () => {
					resolve(reader.result);
				};
			});
		},
		
		//String.prototype.atob
		function() {
			const binaryString = atob(this.replace(/.*,/, ""));
			const uint8Array = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				uint8Array[i] = binaryString.charCodeAt(i);
			}
			return uint8Array;
		},
		
		//String.prototype.btoa
		async function() {
			const blob = new Blob([this]);
			const buffer = await blob.arrayBuffer()
			const uint8 = new Uint8Array(buffer);
			let binaryString = "";
			for (const i of uint8) {
				binaryString += String.fromCharCode(i);
			}
			return btoa(binaryString);
		},
		
		//String.prototype.toUTF8
		function() {
			return new TextEncoder().encode(this);
		},
		
		//String.prototype.toUTF16
		function(endian, bom = false) {
			const arr = (() => {
				const arr = new Array(this.length);
				for (let i = 0; i < this.length; i++) {
					const num = this.charCodeAt(i);
					arr[i] = num.toString(16).padStart(4, "0");
				}
				return arr.join("").split("");
			})``;
			const uint8 = new Uint8Array(this.length * 2);
			for (let i = 0, a = 0; i < arr.length; i++) {
				const str = arr[a] + arr[a+1];
				a += 2;
				uint8[i] = parseInt(str, 16);
			}
			endian = (() => {
				if (endian === "be" || endian === "BE") {
					return "BE";
				}else if (endian === "le" || endian === "LE") {
					return "LE";
				}else {
					return undefined;
				}
			})``;
			bom = (() => {
				const be = [254, 255];
				const le = [255, 254];
				if (endian === undefined) {
					return be;
				}else if (endian === "BE" && bom == true) {
					return be;
				}else if (endian === "LE" && bom == true) {
					return le;
				}else {
					return false;
				}
			})``;
			if (endian === "LE") {
				for (let i = 0; i < uint8.length; i+=2) {
					const a = uint8[i];
					const b = uint8[i+1];
					uint8[i] = b;
					uint8[i+1] = a;
				}
			}
			if (bom !== false) {
				const uint8_2 = new Uint8Array(uint8.length + 2);
				let n = 0;
				uint8_2[n++] = bom[0];
				uint8_2[n++] = bom[1];
				for (const i of uint8) {
					uint8_2[n++] = i;
				}
				return uint8_2;
			}
			return uint8;
		},
		
		//String.prototype.base16Decode
		function() {
			const array = this.replace(/[^0-9A-Fa-f]/g, "").split("");
			const uint8 = new Uint8Array(array.length / 2);
			for (let i = 0, n = 0; i < uint8.length; i++) {
				const str = array[n] + array[n+1];
				uint8[i] = parseInt(str, 16);
				n += 2;
			}
			return uint8;
		},
		
		//String.prototype.normalizeNewline
		 function(newline = "\n") {
			return this.replace(/\r\n|\r|\n/g, newline);
		},
		
		//String.prototype.trimIndent
		 function(trimStart = true, trimEnd = true) {
			let str = this.replace(/^ +|^\t+/mg, "");
			if (trimStart == true) str = str.trimStart();
			if (trimEnd == true) str = str.trimEnd();
			return str;
		},
		
		//Uint8Array.prototype.btoa
		function() {
			let binaryString = "";
			for (const i of this) {
				binaryString += String.fromCharCode(i);
			}
			return btoa(binaryString);
		},
		
		//Uint8Array.prototype.text
		function(encoding = "UTF-8") {
			if (encoding === "UTF-16") encoding = "UTF-16BE";
			return new Promise(resolve => {
				const blob = new Blob([this]);
				const reader = new FileReader();
				reader.readAsText(blob, encoding);
				reader.onload = () => {
					resolve(reader.result);
				};
			});
		},
		
		//Uint8Array.prototype.loop
		function(min = 0, max = 255, start = 0, end = this.length - 1) {
			let value = min;
			for (let i = start; i <= end; i++) {
				this[i] = value;
				value++;
				if (value > max) value = min;
			}
			return this;
		},
		
		//Uint8Array.prototype.random
		function(min = 0, max = 255, start = 0, end = this.length - 1) {
			for (let i = start; i <= end; i++) {
				this[i] = Math.floor( Math.random() * (max - min + 1) + min );
			}
			return this;
		},
		
		//Uint8Array.prototype.base16Encode
		function(space = "", padding = true, upperCase = true) {
			const array = new Array(this.length);
			for (let i = 0; i < array.length; i++) {
				array[i] = this[i].toString(16);
				if (upperCase === true) array[i] = array[i].toUpperCase();
				if (padding === true) array[i] = array[i].padStart(2, "0");
			}
			return array.join(space);
		}
	];
	
	//メソッドの競合判定、定義、凍結
	let n = 0;
	for (const i of methodNames) {
		const objectName = i[0];
		const methodName = i[1];
		const method = (() => {
			const method = new Array(methodName.length);
			for (let i = 0; i < method.length; i++) {
				method[i] = methods[n];
				n++
			}
			return method;
		})``;
		defineProperty(methodName, method, objectName);
	}
})``;
