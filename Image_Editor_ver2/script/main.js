;(async () => {
	"use strict";
	const {
		canvas,
		context,
		showCanvasSize,
		undo
	} = self["constant.js"];
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	showCanvasSize();
	await undo.save(canvas);
	await undo.save(canvas);
})``;
