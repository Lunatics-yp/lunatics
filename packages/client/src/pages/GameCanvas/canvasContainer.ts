import {
	CANVAS_WIDTH, CANVAS_HEIGHT,
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
	// все рисование в одном методе чтобы не дублировать код 
	// т.к корабли являются теми же квадратами при отрисовки
	rect({
		x, y, width, height, fillColor, borderColor,
	}: TRect) {
		this.context.beginPath();
		this.context.moveTo(x, y);
		this.context.lineTo(x + width, y);
		this.context.lineTo(x + width, y + height);
		this.context.lineTo(x, y + height);

		if (borderColor) {
			this.context.strokeStyle = borderColor;
			this.context.stroke();
		}
		//для кораблей дополнительные стили
		if (fillColor) {
			this.context.fillStyle = fillColor;
			this.context.fill();
		}
	}

	clear() {
		this.context.clearRect(0, 0, this.element.width, this.element.height);
	}

	update(rect: TRect) {
		this.rect(rect);
	}
}