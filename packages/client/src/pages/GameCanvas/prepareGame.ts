/* eslint-disable max-len */
import {CanvasContainer} from './canvasContainer';
import {
	CELL_SIZE, shipDatas, EMPTY_COLOR, MISSED_COLOR, OCCUPIED_COLOR,
	BURNING_COLOR, DESTROYED_COLOR,
	BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT, CELL_GAP,
	BORDER_COLOR_SHIP, UNKNOWN_COLOR, MoonGroundCellStatus,
} from './constants';

import {Ship, Coord, MoonGroundCell} from './typing';
import {isOverElement, getRandomInRange, isSomeShipOccupiedCell} from './utils';

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
	mouseCoord: Coord;

	cellArray: MoonGroundCell[][];
	isComputer: boolean;

	constructor(canvasContainer: CanvasContainer, isComputer: boolean) {
		this.canvasContainer = canvasContainer;
		this.ships = shipDatas.map(ship => JSON.parse(JSON.stringify(ship)));
		this.isComputer = isComputer;

		this.handlers = {};

		this.startDraggedCoord = {
			x: 0,
			y: 0,
		};

		this.mouseCoord = {
			x: 0,
			y: 0,
		};
		//пустой двухмерный массив ячеек MoonGroundCell
		//заполняется при вызове метода prepareBoard()
		this.cellArray = [[]];

		this.draggedShip = null;

		this.prepareBoard();

		//добавление обработчиков событий mousedown, mousemove, mouseup
		if (!isComputer) {
			this.addEvent('mousedown', this.takeShip.bind(this));
			this.addEvent('mousemove', this.moveShip.bind(this));
			this.addEvent('mouseup', this.dropShip.bind(this));
			this.addEvent('keydown', this.rotateShip.bind(this));
			this.prepareShips();
		} else {
			this.randomSetPosition();
		}
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

	getWidthShip(ship: Ship) {

		ship.direction === 'row' ? ship.size * CELL_SIZE + (ship.size - 1) * CELL_GAP : CELL_SIZE;
	}

	getHeightShip(ship: Ship) {

		ship.direction === 'row'
			? CELL_SIZE
			: ship.size * CELL_SIZE + (ship.size - 1) * CELL_GAP;
	}

	removeDraggedShip() {
		if (this.draggedShip) {
			this.draggedShip = null;
		}
		this.startDraggedCoord = {
			x: 0,
			y: 0,
		};
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

	rotateShip(event: Event) {
		if (event.type !== 'keydown') {
			return;
		}
		const {code} = event as KeyboardEvent;
		if (code !== 'Space') {
			return;
		}
		if (!this.draggedShip) {
			return;
		}

		this.draggedShip.direction = this.draggedShip.direction === 'column' ? 'row' : 'column';

		this.update();
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
		this.mouseCoord.x = offsetX;
		this.mouseCoord.y = offsetY;
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
		console.log(this.draggedShip);
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

			let _isSomeShipOccupiedCell = false;

			new Array(this.draggedShip.size).fill(1).reduce((prev, index) => {
				if (!_isSomeShipOccupiedCell) {
					_isSomeShipOccupiedCell = isSomeShipOccupiedCell(this.ships, prev);
				}

				return {
					...prev,
					x: prev.x + ((index + 1) * CELL_SIZE),
					y: prev.y,
					status: MoonGroundCellStatus.UNKNOWN,
				};
			}, {
				x: newPosition.x,
				y: newPosition.y,
				status: MoonGroundCellStatus.UNKNOWN,
			});

			// const _isSomeShipOccupiedCell = isSomeShipOccupiedCell(this.ships, {
			// 	x: newPosition.x,
			// 	y: newPosition.y,
			// 	status: MoonGroundCellStatus.UNKNOWN,
			// });

			this.draggedShip.position.x = newPosition.x;
			this.draggedShip.position.y = newPosition.y;
			const flatCells = this.cellArray.flat();

			const cellIndex = flatCells
				.findIndex((cell: MoonGroundCell) =>
					cell.x === newPosition.x && cell.y === newPosition.y);

			if (cellIndex < 0 || _isSomeShipOccupiedCell) {
				this.draggedShip.position = this.draggedShip.startPosition;
			} else {
				this.draggedShip.cells = flatCells
					.slice(cellIndex, cellIndex + this.draggedShip.size)
					.map((cell: MoonGroundCell) => ({x: cell.x, y: cell.y, shot: false}));

				// change this.cellArray cells status
			}

		} else {

			//если корабль не в поле перемещяем на startPosition
			this.draggedShip.position = this.draggedShip.startPosition;
		}
		this.draggedShip.borderColor = BORDER_COLOR_SHIP;
		this.draggedShip = null;
		console.log(this.ships);
		this.update();
		setTimeout(() => {
			console.log(this.cellArray);
		}, 1);
	}

	prepareBoard() {

		// создаем двумерный массив 10 на 10 для отрисовки поля
		// первоначально все поля со статусом UNKNOWN
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
					direction: '',
				});
			});
		});
	}

	//отрисовка кораблей
	prepareShips() {
		this.ships.forEach(({size, color, borderColor, position, direction}) => {
			this.canvasContainer.update({
				x: position.x,
				y: position.y,
				width: size * CELL_SIZE,
				height: CELL_SIZE,
				fillColor: color,
				borderColor: borderColor,
				direction: direction,

			});
		});
	}

	randomSetPosition() {
		const flatCells = this.cellArray.flat();
		const getRandomCol: (ship: Ship, ships: Ship[]) => Coord = (ship: Ship, ships: Ship[]) => {
			const randowRowIndex = getRandomInRange(0, this.cellArray.length - 1);
			const randowRow = this.cellArray[randowRowIndex];
			const randomColIndex = getRandomInRange(0, this.cellArray.length - ship.size);
			const randomCol = randowRow[randomColIndex];
			console.log(ships, randomCol);
			if (isSomeShipOccupiedCell(ships, randomCol)) {
				return getRandomCol(ship, ships);
			}

			return randomCol;
		};
		this.ships.forEach((ship) => {
			const randomCol = getRandomCol(ship, this.ships);
			ship.position.x = randomCol.x;
			ship.position.y = randomCol.y;
			const cellIndex = flatCells
				.findIndex((cell: MoonGroundCell) =>
					cell.x === ship.position.x && cell.y === ship.position.y);

			ship.cells = flatCells
				.slice(cellIndex, cellIndex + ship.size)
				.map((cell: MoonGroundCell) => ({x: cell.x, y: cell.y, shot: false}));
		});
		console.log(this.ships);

		this.update();
	}

	update() {
		requestAnimationFrame(() => {
			this.canvasContainer.clear();
			this.prepareBoard();
			this.prepareShips();
		});
	}
}
