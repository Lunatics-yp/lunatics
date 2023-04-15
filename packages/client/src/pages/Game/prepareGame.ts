/* eslint-disable max-len */
import {CanvasContainer} from './canvasContainer';
import {
	CELL_SIZE, shipDatas, EMPTY_COLOR, MISSED_COLOR, OCCUPIED_COLOR,
	BURNING_COLOR, DESTROYED_COLOR, PREPARATION_SCREEN_START_FIELD_COORD_X,
	PREPARATION_SCREEN_START_FIELD_COORD_Y, BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT,
	BORDER_COLOR_SHIP,
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

export class PrepareGame {
	canvasContainer: CanvasContainer;
	ships: Ship[];
	handlers: Record<string, Array<(event: Event) => void>>;
	startDraggedCoord: Coord;
	draggedShip: null | Ship;
	mouseCoord: Coord;
	cellArray: MoonGroundCell[][];

	constructor(canvasContainer: CanvasContainer) {
		this.canvasContainer = canvasContainer;
		this.ships = shipDatas.map(ship => ship);

		this.handlers = {};

		this.startDraggedCoord = {
			x: 0,
			y: 0,
		};

		this.mouseCoord = {
			x: 0,
			y: 0,
		};

		this.cellArray = [[]];

		this.draggedShip = null;

		this.addEvent('mousedown', this.takeShip.bind(this));
		this.addEvent('mousemove', this.moveShip.bind(this));
		this.addEvent('mouseup', this.dropShip.bind(this));
	}

	getShipStartingCell(ship: Ship) {
		return this.cellArray
			.flat()
			.find(
				cell =>
					ship &&
					ship.position.x - cell.x < 23 &&
					ship.position.x - cell.x >= -23 &&
					ship.position.y - cell.y < 23 &&
					ship.position.y - cell.y >= -23,
			);
	}

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

	takeShip(event: Event) {
		if (event.type !== 'mousedown') {
			return;
		}
		const {offsetX, offsetY} = event as MouseEvent;
		this.startDraggedCoord = {
			x: offsetX,
			y: offsetY,
		};

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

		this.draggedShip.borderColor = 'red';

		const {offsetX, offsetY} = event as MouseEvent;

		this.mouseCoord.x = offsetX;
		this.mouseCoord.y = offsetY;

		const newPosition = {
			x: offsetX - (this.draggedShip.size * CELL_SIZE) / 2,
			y: offsetY - (CELL_SIZE / 2),
		};

		this.startDraggedCoord = {
			x: offsetX,
			y: offsetY,
		};
		this.canvasContainer.clear();
		this.update();

		this.draggedShip.position = newPosition;
	}

	dropShip() {
		if (!this.draggedShip) {
			return;
		}

		if (
			!isOverElement(
				{
					x: this.draggedShip.position?.x,
					y: this.draggedShip.position?.y,
					width: this.draggedShip.size * CELL_SIZE,
					height: CELL_SIZE,
				},
				{
					x: PREPARATION_SCREEN_START_FIELD_COORD_X - CELL_SIZE / 2,
					y: PREPARATION_SCREEN_START_FIELD_COORD_Y - CELL_SIZE / 2,
					width: PREPARATION_SCREEN_START_FIELD_COORD_X + BATTLEFIELD_WIDTH + CELL_SIZE / 2,
					height: PREPARATION_SCREEN_START_FIELD_COORD_Y + BATTLEFIELD_HEIGHT + CELL_SIZE / 2,
				},
			)
		) {
			this.draggedShip.position = this.draggedShip.startPosition;
		} else {
			// тут провека на то, что место занято другим кораблём

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
			console.log(this.ships);
		}, 1);
	}

	prepareBoard() {
		// создаем двумерный массив 10 на 10 для отрисовки поля
		this.cellArray = Array.from({length: 10}, () =>
			Array.from({length: 10}, () => ({
				x: 0,
				y: 0,
				status: MoonGroundCellStatus.UNKNOWN,
			})),
		);

		// заполняем массив ячеек
		for (let row = 0; row < this.cellArray.length; row++) {
			for (let col = 0; col < this.cellArray[row].length; col++) {
				this.cellArray[row][col] = {
					x: col * CELL_SIZE,
					y: row * CELL_SIZE,
					status: MoonGroundCellStatus.UNKNOWN,
				};
			}
		}

		// отрисовываем ячейки на холсте 
		//в зависимости от статуса меняется цвет
		this.cellArray.forEach((row) => {
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
