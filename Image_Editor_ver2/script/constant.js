;(() => {
	"use strict";
	const {
		imageToCanvas,
		toImageData
	} = self["editImage.js"];
	const p_state = $("#p_state");
	const input_filename = $("#input_filename");
	const radio_png = $("#radio_png");
	const radio_jpg = $("#radio_jpg");
	const input_jpg = $("#input_jpg");
	const anchor = $("#anchor");
	const div_canvasSize = $("#div_canvasSize");
	const canvas = $("#canvas");
	const context = canvas.getContext("2d");
	const showCanvasSize = () => {
		div_canvasSize.innerText = `
			width: ${canvas.width}
			height: ${canvas.height}
		`.trimIndent();
	};
	const undo = (() => {
		const savedata = [null, null];
		const undo = async () => {
			p_state.innerText = "処理中";
			const tmp = savedata[1];
			savedata[1] = savedata[0];
			savedata[0] = tmp;
			await imageToCanvas(tmp, canvas);
			p_state.innerText = "undoしました";
		};
		undo.save = async (image) => {
			savedata[1] = savedata[0];
			savedata[0] = await toImageData(image);
		};
		return undo;
	})``;
	defineProperty("constant.js", Object.freeze({
		p_state,
		input_filename,
		radio_png,
		radio_jpg,
		input_jpg,
		anchor,
		div_canvasSize,
		canvas,
		context,
		showCanvasSize,
		undo
	}));
})``;
