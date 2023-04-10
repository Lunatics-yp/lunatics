import {CanvasContainer} from './canvasContainer';

import {CELL_SIZE, shipDatas} from './constants';

export class PrepareGame {
	canvasContainer: CanvasContainer;

	constructor(canvasContainer: CanvasContainer) {
		this.canvasContainer = canvasContainer;
	}

	prepareBoard() {
		//cellArray переменная для отрисовки поля создаем массив 10 на 10
		//начальные координаты по x и у 0. 0, каждый шаг плюс 30px 
		//дойдя по оси x до 270 переходим на следующий ряд к координатам 0, 30

		const cellArray = Array(10 * 10).fill(1).map((_value, index) => {
			return {
				x: (index % 10) * CELL_SIZE,
				y: Math.floor(index / 10) * CELL_SIZE,
			};
		});

		// один квадрат отрисовка 
		cellArray.forEach(cell => {
			this.canvasContainer.update({
				x: cell.x, y: cell.y, width: CELL_SIZE,
				height: CELL_SIZE, borderColor: '#cccc',
			});
		});
	}

	//отрисовка кораблей 
	prepareShips() {
		shipDatas.forEach(ship => {
			this.canvasContainer.update({
				x: ship.startPosition.x,
				y: ship.startPosition.y,
				width: ship.size * CELL_SIZE,
				height: CELL_SIZE,
				fillColor: ship.color,
				borderColor: ship.borderColor,
			});
		});
	}
}
