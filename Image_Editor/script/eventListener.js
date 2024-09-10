;(() => {
	"use strict";
	const {
		p_state,
		input_filename,
		radio_png,
		radio_jpg,
		input_jpg,
		canvas,
		context,
		showCanvasSize
	} = self["constant.js"];
	const {
		resize,
		enlarge,
		reverse,
		space,
		cut,
		rotateCanvas
	} = self["canvasLib.js"];
	{
		const input_file = $("#input_file");
		input_file.onchange = async () => {
			const file = input_file.files[0];
			p_state.innerText = "画像を読み込んでいます";
			await drawImagefileToCanvas(file, canvas);
			p_state.innerText = "画像を読み込みました";
			showCanvasSize();
		};
	}
	{
		const changeExtension = (type) => {
			let str = input_filename.value;
			input_filename.value = str.replace(/\.\w+$/, type);
		};
		radio_png.oninput = () => {
			input_jpg.style.visibility = "hidden";
			changeExtension(".png");
		};
		radio_jpg.oninput = () => {
			input_jpg.style.visibility = "visible";
			changeExtension(".jpg");
		};
	}
	{
		let url;
		$("#button_download").onclick = async () => {
			p_state.innerText = "ダウンロード準備中";
			await sleep();
			URL.revokeObjectURL(url);
			const filename = input_filename.value;
			const mimeType = (() => {
				if (radio_png.checked) {
					return "image/png";
				}else if (radio_jpg.checked) {
					return "image/jpeg";
				}
			})``;
			const qualityArgument = (() => {
				const num = Number(input_jpg.value);
				if (num < 0 || num > 1) {
					input_jpg.value = 0.85;
					return 0.85;
				}
				return num;
			})``;
			url = await canvasToURL(canvas, mimeType, qualityArgument);
			anchor.href = url;
			anchor.download = filename;
			p_state.innerText = "ダウンロード可能";
		};
	}
	{
		const input_radio = $(".input_radio");
		const div_UI = $(".div_UI");
		const func = () => {
			for (const i of div_UI) {
				i.style.display = "none";
			}
		};
		for (let i = 0; i < input_radio.length; i++) {
			input_radio[i].oninput = () => {
				func();
				div_UI[i].style.display = "inline";
			};
		}
	}
	{
		const input_width = $("#input_resize_width");
		const input_height = $("#input_resize_height");
		const input_ratio = $("#input_resize_ratio");
		$("#button_resize").onclick = async () => {
			p_state.innerText = "処理中";
			await sleep();
			let tmp;
			if (input_ratio.value == "") {
				const width = Number(input_width.value);
				const height = Number(input_height.value);
				tmp = await resize(canvas, width, height);
			}else {
				const ratio = Number(input_ratio.value);
				const width = Math.round(canvas.width * ratio);
				const height = Math.round(canvas.height * ratio);
				tmp = await resize(canvas, width, height);
			}
			if (tmp !== null) {
				p_state.innerText = "resized";
				showCanvasSize();
			}else {
				p_state.innerText = "自然数を入力してください";
			}
		};
	}
	{
		const input = $("#input_enlarge");
		$("#button_enlarge").onclick = async () => {
			const showState = (per) => {
				p_state.innerText = `${per}%`;
			};
			const ratio = Number(input.value);
			const tmp = await enlarge(canvas, ratio, showState);
			if (tmp !== null) {
				p_state.innerText = "enlarged";
				showCanvasSize();
			}else {
				p_state.innerText = "2以上の自然数を入力してください";
			}
		};
	}
	{
		$("#button_reverse").onclick = async () => {
			p_state.innerText = "左右反転中";
			await sleep();
			reverse(canvas);
			p_state.innerText = "左右反転完了";
		};
	}
	{
		const input_left = $("#input_space_left");
		const input_right = $("#input_space_right");
		const input_top = $("#input_space_top");
		const input_bottom = $("#input_space_bottom");
		const input_background = $("#input_space_background");
		$("#button_space").onclick = async () => {
			p_state.innerText = "空白追加中";
			await sleep();
			const left = input_left.value;
			const right = input_right.value;
			const top = input_top.value;
			const bottom = input_bottom.value;
			const background = input_background.value;
			space(canvas, left, right, top, bottom, background);
			p_state.innerText = "空白追加完了";
			showCanvasSize();
		};
	}
	{
		const input_left = $("#input_cut_left");
		const input_right = $("#input_cut_right");
		const input_top = $("#input_cut_top");
		const input_bottom = $("#input_cut_bottom");
		$("#button_cut").onclick = async () => {
			p_state.innerText = "切り取り中";
			await sleep();
			const left = Number(input_left.value);
			const right = Number(input_right.value);
			const top = Number(input_top.value);
			const bottom = Number(input_bottom.value);
			cut(canvas, left, right, top, bottom);
			p_state.innerText = "切り取り完了";
			showCanvasSize();
		};
	}
	{
		const input_file = $("#input_file_insert");
		const input_left = $("#input_insert_left");
		const input_top = $("#input_insert_top");
		let imgDat;
		$("#button_insert").onclick = async () => {
			p_state.innerText = "now inserting";
			await sleep();
			const x = Number(input_left.value);
			const y = Number(input_top.value);
			if (!imgDat) {
				imgDat = context.getImageData(0, 0, canvas.width, canvas.height);
			}
			{
				const width = canvas.width;
				canvas.width = 0;
				canvas.width = width;
			}
			context.putImageData(imgDat, 0, 0);
			await drawImagefileToCanvas(input_file.files[0], canvas, undefined, undefined, x, y, false);
			p_state.innerText = "inserted";
		};
		$("#button_insert_done").onclick = () => {
			imgDat = context.getImageData(0, 0, canvas.width, canvas.height);
			p_state.innerText = "done insert";
		};
		$("#button_insert_cancel").onclick = () => {
			if (imgDat) {
				context.putImageData(imgDat, 0, 0);
			}
			p_state.innerText = "cancel insert";
		};
	}
	{
		$("#button_rotate").onclick = async () => {
			p_state.innerText = "now rotating";
			await sleep();
			await rotateCanvas(canvas);
			p_state.innerText = "rotated";
			showCanvasSize();
		};
	}
	{
		const input = $("#input_canvasSize");
		input.oninput = () => {
			canvas.style.width = input.value;
		}
	}
})``;
