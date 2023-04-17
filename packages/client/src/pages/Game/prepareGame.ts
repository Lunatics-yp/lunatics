/* eslint-disable max-len */
import {CanvasContainer} from './canvasContainer';
import {
	CELL_SIZE, shipDatas, EMPTY_COLOR, MISSED_COLOR, OCCUPIED_COLOR,
	BURNING_COLOR, DESTROYED_COLOR,
	BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT,
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
		const ship = this.ships.find(ship => {
			return isOverElement(
				{
					x: offsetX,
					y: offsetY,
					width: 0,
					height: 0,
				},
				{
					x: ship.position.x,
					y: ship.position.y,
					width: ship.size * CELL_SIZE,
					height: CELL_SIZE,
				},
			);
		});

		// перемещаемый корабль
		if (ship) {
			this.draggedShip = ship;
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
			x: offsetX,
			y: offsetY,
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

		const firstCells = this.cellArray[0][0];

		//проверка:поставлен ли корабль на сетку 
		if (
			isOverElement(
				// объект относящийся к кораблю
				{
					x: this.draggedShip.position.x,
					y: this.draggedShip.position.y,
					width: this.draggedShip.size * CELL_SIZE,
					height: CELL_SIZE,
				},
				// объект относящийся к полю
				{
					x: firstCells.x,
					y: firstCells.y,
					width: BATTLEFIELD_WIDTH,
					height: BATTLEFIELD_HEIGHT,
				},
			)
		) {
			// расположение корабля в поле и сбрасываем borderColor
			// после сбрасываем перемещаемый корабль (draggedShip)
			const newPosition = {
				x: 10 * Math.round(this.draggedShip.position.x / 10),
				y: 10 * Math.round(this.draggedShip.position.y / 10),
			};
			this.draggedShip.position.x = newPosition.x;
			this.draggedShip.position.y = newPosition.y;
			const flatCells = this.cellArray.flat();
			const cellIndex = flatCells
				.findIndex((cell: MoonGroundCell) =>
					cell.x === newPosition.x && cell.y === newPosition.y);

			if (cellIndex < 0) {
				this.draggedShip.position = this.draggedShip.startPosition;
			} else {
				this.draggedShip.cells = flatCells
					.slice(cellIndex, cellIndex + this.draggedShip.size)
					.map((cell: MoonGroundCell) => ({x: cell.x, y: cell.y, shot: false}));
			}

		} else {
			//если корабль не в поле перемещяем на startPosition
			this.draggedShip.position = this.draggedShip.startPosition;
		}
		this.draggedShip.borderColor = BORDER_COLOR_SHIP;
		this.update();
		setTimeout(() => {
			this.draggedShip = null;
			console.log(this.ships);
		}, 1);
	}

	prepareBoard() {
		// создаем двумерный массив 10 на 10 для отрисовки поля
		this.cellArray = Array.from({length: 10}, () =>
			Array.from({length: 10}, () => ({
				x: 0,
				y: 0,
				status: MoonGroundCellStatus.BURNING,
			})),
		);

		// заполняем массив ячеек
		for (let row = 0; row < this.cellArray.length; row++) {
			for (let col = 0; col < this.cellArray[row].length; col++) {
				this.cellArray[row][col] = {
					x: col * CELL_SIZE,
					y: row * CELL_SIZE,
					status: MoonGroundCellStatus.BURNING,
				};
			}
		}

		// отрисовываем ячейки на холсте
		// в зависимости от статуса меняется цвет
		this.cellArray.forEach((row) => {
			row.forEach((cell) => {
				const fillColor = myColors[cell.status];
				fillColor;
				this.canvasContainer.update({
					x: cell.x,
					y: cell.y,
					width: CELL_SIZE,
					height: CELL_SIZE,
					borderColor: '#cccc',
				});
			});
		});
	}

	//отрисовка кораблей
	prepareShips() {
		this.ships.forEach(({size, color, borderColor, position}) => {
			this.canvasContainer.update({
				x: position.x,
				y: position.y,
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
