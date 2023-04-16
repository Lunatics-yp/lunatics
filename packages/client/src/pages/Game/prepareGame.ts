/* eslint-disable max-len */
import {CanvasContainer} from './canvasContainer';
import {
	CELL_SIZE, shipDatas, EMPTY_COLOR, MISSED_COLOR, OCCUPIED_COLOR,
	BURNING_COLOR, DESTROYED_COLOR, PREPARATION_SCREEN_START_FIELD_COORD_X,
	PREPARATION_SCREEN_START_FIELD_COORD_Y, BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT,
	BORDER_COLOR_SHIP, UNKNOWN_COLOR,
} from './constants';

import {Ship, Coord} from './typing';
import {isOverElement} from './utils';

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

const myColors = {
	[MoonGroundCellStatus.UNKNOWN]: UNKNOWN_COLOR,
	[MoonGroundCellStatus.EMPTY]: EMPTY_COLOR,
	[MoonGroundCellStatus.MISSED]: MISSED_COLOR,
	[MoonGroundCellStatus.OCCUPIED]: OCCUPIED_COLOR,
	[MoonGroundCellStatus.BURNING]: BURNING_COLOR,
	[MoonGroundCellStatus.DESTROYED]: DESTROYED_COLOR,
};

export class PrepareGame {
	canvasContainer: CanvasContainer;
	ships: Ship[];
	handlers: Record<string, Array<(event: Event) => void>>;
	startDraggedCoord: Coord;
	draggedShip: null | Ship;

	cellArray: MoonGroundCell[][];

	constructor(canvasContainer: CanvasContainer) {
		this.canvasContainer = canvasContainer;
		this.ships = shipDatas.map(ship => ship);

		this.handlers = {};

		this.startDraggedCoord = {
			x: 0,
			y: 0,
		};

		//пустой двухмерный массив ячеек MoonGroundCell
		//заполняется при вызове метода prepareBoard()
		this.cellArray = [[]];

		this.draggedShip = null;

		//добавление обработчиков событий mousedown, mousemove, mouseup
		this.addEvent('mousedown', this.takeShip.bind(this));
		this.addEvent('mousemove', this.moveShip.bind(this));
		this.addEvent('mouseup', this.dropShip.bind(this));
	}

	// проверка, является ли корабль частью сетки
	// если да, то функция вернет ту ячейку, на которую попадает
	// край корабля - CELL_SIZE примерное значение, в будущем изменю
	// (после того как продумаем где будет по итогу расположена сетка и корабли, 
	// в будущем подпралю через константы)
	getShipStartingCell(ship: Ship) {
		return this.cellArray
			.flat()
			.find(
				cell =>
					ship &&
					ship.position.x - cell.x < CELL_SIZE &&
					ship.position.x - cell.x >= -CELL_SIZE &&
					ship.position.y - cell.y < CELL_SIZE &&
					ship.position.y - cell.y >= -CELL_SIZE,
			);
	}

	//обработчик событий (клик, перемещение мышки, отпуск кнопки мышки)
	addEvent(eventName: string, callback: (event: Event) => void) {
		if (!this.handlers[eventName]) {
			this.handlers[eventName] = [callback];
		} else {
			const duplicate = this.handlers[eventName]?.find(item => item === callback);

			if (!duplicate) {
				this.handlers[eventName]?.push(callback);
			}
		}

		document.addEventListener(eventName, callback);
	}

	//метод для удаления счетчиков событий
	removeEvent(eventName: string, callback: (event: Event) => void) {
		if (!this.handlers[eventName]) {
			return;
		}

		this.handlers[eventName] =
			this.handlers[eventName]?.filter(event => event === callback) || [];

		document.removeEventListener(eventName, callback);
	}

	removeAllEvents() {
		Object.entries(this.handlers).forEach(([eventName, callbacks]) => {
			callbacks.forEach(callback => this.removeEvent(eventName, callback));
		});
	}
	// вызывается при клике на корабль
	// проверяем, попадает ли он под положение мышки или нет (startPosition)
	takeShip(event: Event) {
		if (event.type !== 'mousedown') {
			return;
		}
		const {offsetX, offsetY} = event as MouseEvent;
		this.startDraggedCoord = {
			x: offsetX,
			y: offsetY,
		};

		// перебираем массив всех кораблей
		const ship = this.ships.find(shipItem =>
			isOverElement(
				{
					x: offsetX,
					y: offsetY,
					width: 0,
					height: 0,
				},
				{
					// eslint-disable-next-line max-len
					x: shipItem.startPosition.x,
					y: shipItem.startPosition.y,
					width: shipItem.size * CELL_SIZE,
					height: CELL_SIZE,
				},
			),
		);

		// перемещаемый корабль
		if (ship) {
			this.draggedShip = ship;
			console.log('here is this.draggedShip ', this.draggedShip);
		}
	}

	moveShip(event: Event) {
		if (event.type !== 'mousemove') {
			return;
		}

		if (!this.draggedShip) {
			return;
		}

		// перетаскиваемый корабль меняет цвет обводки
		this.draggedShip.borderColor = 'red';

		const {offsetX, offsetY} = event as MouseEvent;

		//обновление позиции
		const newPosition = {
			x: offsetX - (this.draggedShip.size * CELL_SIZE) / 2,
			y: offsetY - (CELL_SIZE / 2),
		};

		this.startDraggedCoord = {
			x: offsetX,
			y: offsetY,
		};

		//сбрасываем весь canvas и вывываем update(перерисувываем)
		this.canvasContainer.clear();
		this.update();

		this.draggedShip.position = newPosition;
	}

	dropShip() {
		if (!this.draggedShip) {
			return;
		}

		//проверка:поставлен ли корабль на сетку 
		if (
			!isOverElement(
				// объект относящийся к кораблю
				{
					x: this.draggedShip.position?.x,
					y: this.draggedShip.position?.y,
					width: this.draggedShip.size * CELL_SIZE,
					height: CELL_SIZE,
				},
				// объект относящийся к полю
				{
					x: PREPARATION_SCREEN_START_FIELD_COORD_X - CELL_SIZE / 2,
					y: PREPARATION_SCREEN_START_FIELD_COORD_Y - CELL_SIZE / 2,
					width: PREPARATION_SCREEN_START_FIELD_COORD_X + BATTLEFIELD_WIDTH + CELL_SIZE / 2,
					height: PREPARATION_SCREEN_START_FIELD_COORD_Y + BATTLEFIELD_HEIGHT + CELL_SIZE / 2,
				},
			)
		) {

			//если корабль не в поле перемещяем на startPosition
			this.draggedShip.position = this.draggedShip.startPosition;
		} else {

			// расположение корабля в поле и сбрасываем borderColor
			// после сбрасываем перемещаемый корабль (draggedShip)
			const shipCells = this.getShipStartingCell(this.draggedShip);
			const index = this.cellArray
				.flat()
				.findIndex((cell: MoonGroundCell) => cell.x === shipCells?.x && cell.y === shipCells?.y);
			this.draggedShip.cells = this.cellArray
				.flat()
				.slice(index, index + this.draggedShip.size)
				.map(it => ({x: it.x, y: it.y, shot: false}));
		}
		this.draggedShip.borderColor = BORDER_COLOR_SHIP;
		this.update();
		setTimeout(() => {
			this.draggedShip = null;
		}, 1);
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
		// в зависимости от статуса меняется цвет
		cellArray.forEach((row) => {
			row.forEach((cell) => {
				const fillColor = myColors[cell.status];
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
		this.ships.forEach(({size, color, borderColor, startPosition, position}) => {
			this.canvasContainer.update({
				x: position.x || startPosition.x,
				y: position.y || startPosition.y,
				width: size * CELL_SIZE,
				height: CELL_SIZE,
				fillColor: color,
				borderColor: borderColor,
			});
		});
	}

	update() {
		requestAnimationFrame(() => {
			this.canvasContainer.clear();
			this.prepareBoard();
			this.prepareShips();
		});
	}
}
