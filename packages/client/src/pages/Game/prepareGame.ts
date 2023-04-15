import {CanvasContainer} from './canvasContainer';
import {
	CELL_SIZE, shipDatas, EMPTY_COLOR, MISSED_COLOR, OCCUPIED_COLOR,
	BURNING_COLOR, DESTROYED_COLOR,
} from './constants';

enum MoonGroundCellStatus {
  UNKNOWN = 'UNKNOWN',
  EMPTY = 'EMPTY',
  OCCUPIED = 'OCCUPIED',
  MISSED = 'MISSED',
  BURNING = 'BURNING',
  DESTROYED = 'DESTROYED',
}

interface MoonGroundCell {
  x: number;
  y: number;
  status: MoonGroundCellStatus;
}

export class PrepareGame {
	canvasContainer: CanvasContainer;

	constructor(canvasContainer: CanvasContainer) {
		this.canvasContainer = canvasContainer;
	}

	prepareBoard() {
		// создаем двумерный массив 10 на 10 для отрисовки поля
		const cellArray: MoonGroundCell[][] = Array.from({length: 10}, () =>
			Array.from({length: 10}, () => ({
				x: 0,
				y: 0,
				status: MoonGroundCellStatus.UNKNOWN,
			})),
		);

		// заполняем массив ячеек
		for (let row = 0; row < cellArray.length; row++) {
			for (let col = 0; col < cellArray[row].length; col++) {
				cellArray[row][col] = {
					x: col * CELL_SIZE,
					y: row * CELL_SIZE,
					status: MoonGroundCellStatus.UNKNOWN,
				};
			}
		}

		// отрисовываем ячейки на холсте 
		//в зависимости от статуса меняется цвет
		cellArray.forEach((row) => {
			row.forEach((cell) => {
				let fillColor = '';
				switch (cell.status) {
					case MoonGroundCellStatus.EMPTY:
						fillColor = EMPTY_COLOR;
						break;
					case MoonGroundCellStatus.MISSED:
						fillColor = MISSED_COLOR;
						break;

					case MoonGroundCellStatus.OCCUPIED:
						fillColor = OCCUPIED_COLOR;
						break;
					case MoonGroundCellStatus.BURNING:
						fillColor = BURNING_COLOR;
						break;

					case MoonGroundCellStatus.DESTROYED:
						fillColor = DESTROYED_COLOR;
						break;
				}

				this.canvasContainer.update({
					x: cell.x,
					y: cell.y,
					width: CELL_SIZE,
					height: CELL_SIZE,
					borderColor: '#cccc',
					fillColor: fillColor,
				});
			});
		});
	}

	//отрисовка кораблей
	prepareShips() {
		shipDatas.forEach((ship) => {
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
