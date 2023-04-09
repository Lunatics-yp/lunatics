import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
} from './constants';
import {TRect} from './typing';

export class CanvasContainer {
	width = CANVAS_WIDTH;

	height = CANVAS_HEIGHT;

	context: CanvasRenderingContext2D;

	element: HTMLCanvasElement;

	constructor(canvasElement: HTMLCanvasElement) {

		const canvasContext = canvasElement.getContext('2d');

		this.context = canvasContext as CanvasRenderingContext2D;
		this.element = canvasElement;

		this.element.width = CANVAS_WIDTH;
		this.element.height = CANVAS_HEIGHT;
	}
	// рисование одного блока(квадратика)
	rect({
		x, y, width, height, color, borderColor,
	}: TRect) {
		this.context.beginPath();
		this.context.moveTo(x, y);
		this.context.lineTo(x + width, y);
		this.context.lineTo(x + width, y + height);
		this.context.lineTo(x, y + height);

		if (borderColor) {
			this.context.stroke();
		}
		//для кораблей доп
		if (color) {
			this.context.fillStyle = color;
			this.context.fill();
		}
	}

	update({
		x, y, width, height, color, borderColor,
	}: TRect) {
		this.rect({
			x, y, width, height, color, borderColor,
		} as TRect);
	}
}
