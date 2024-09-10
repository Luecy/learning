;(() => {
	"use strict";
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
		showCanvasSize
	}));
})``;
