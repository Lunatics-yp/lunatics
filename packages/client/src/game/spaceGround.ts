import {
	CellStatus,
	TCoordinates,
	TCell,
	TSpaceGroundProps,
	TMap,
	TSize,
} from './typing';

// Данные для первоначального заполнения клетки
// На самом деле status перезаписывается полученным из пропсов,
// но если initStatus не указан, то остаётся этот
const emptyCell: TCell = {
	status: CellStatus.EMPTY,
};

// Класс игрового поля
export class SpaceGround {

	private readonly _map: TMap; // Карта игрового поля, двумерный массив статусов ячеек

	constructor(data: TSpaceGroundProps) {
		// Статус для первоначального заполнения клеток.
		// Используется для заполнения клеток вражеского поля статусом Unknown, а своего Empty
		const {initStatus = CellStatus.EMPTY} = data;
		// Сначала создаём пустой двумерный массив
		this._map = new Array(data.height).fill(undefined)
			.map(() => new Array(data.width).fill(undefined));
		// Затем заполняем его пустыми клетками
		for (let y = 0; y < data.height; y++) {
			for (let x = 0; x < data.width; x++) {
				this._map[y][x] = {...emptyCell, status: initStatus};
			}
		}
	}

	// Карта игрового поля
	get map(): TMap & {size: TSize} {
		const height = this._map.length;
		const width = this._map[0].length;
		return Object.assign(this._map, {size: {height, width}});
	}

	// Очистка игрового поля
	clear = () => {
		for (let y = 0; y < this.map.size.height; y++) {
			for (let x = 0; x < this.map.size.width; x++) {
				this.map[y][x] = {...emptyCell};
			}
		}
	};

	// Входит ли координата в игровое поле
	isPositionInsideMap = (coordinates: TCoordinates): boolean => {
		const {width: mapWidth, height: mapHeight} = this.map.size;
		return (coordinates.x >= 0
			&& coordinates.y >= 0
			&& coordinates.y < mapHeight
			&& coordinates.x < mapWidth);
	};

	// Проверка, можно ли по выбранным координатам установить ячейку лунного модуля
	isCanPlaceCellHere = (coordinates: TCoordinates): boolean => {
		let result = true;

		// Если за пределами - нельзя
		if (!this.isPositionInsideMap(coordinates)) {
			return false;
		}

		// По правилам расстановки, вокруг лунного модуля должно быть по 1 пустой клетке
		// Для этого создаём массив из всех окружающих клеток и проверяем их
		const allCoordinates: TCoordinates[] = [];
		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				allCoordinates.push({
					x: coordinates.x + x,
					y: coordinates.y + y,
				});
			}
		}

		// Перебираем полученный массив
		// Если клетка внутри поля и не пустая, то нельзя
		// Клетка может оказаться вне поля, если модуль располагается возле стенки
		// Тогда часть "окружающих" клеток окажется вне поля, это не является отказом
		for (const oneCoordinate of allCoordinates) {
			if (this.isPositionInsideMap(oneCoordinate)
				&& this.map[oneCoordinate.y][oneCoordinate.x].status !== CellStatus.EMPTY
			) {
				result = false;
			}
		}

		return result;
	};

	// Установить статус клетки игрового поля
	setCellStatus = (coordinates: TCoordinates, status: CellStatus): void => {
		// Внутри карты X и Y меняются местами для двумерного массива
		this.map[coordinates.y][coordinates.x].status = status;
	};

	// Получить статус клетки игрового поля
	getCellStatus = (coordinates: TCoordinates): CellStatus => {
		// Внутри карты X и Y меняются местами для двумерного массива
		return this.map[coordinates.y][coordinates.x].status;
	};

	// Получить список клеток, доступных для стрельбы,
	// а так же список горящих клеток
	getAllCellForShootingAndBurning = (): {
		burnings: TCoordinates[];
		targets: TCoordinates[];
	} => {
		const {width, height} = this.map.size;
		const burnings: TCoordinates[] = [];
		const targets: TCoordinates[] = [];
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const coordinates = {x, y};
				if (this.isCanShootHere(coordinates, false)) {
					targets.push(coordinates);
				} else {
					const cellStatus = this.getCellStatus(coordinates);
					if (cellStatus === CellStatus.BURNING) {
						burnings.push(coordinates);
					}
				}
			}
		}
		return {
			burnings,
			targets,
		};
	};

	/**
	 * Узнать, можно ли по выбранной координате стрелять
	 * Нельзя стрелять, если координата вне границ игрового поля,
	 * или если по координате уже был произведён выстрел
	 * @param {TCoordinates} coordinates - Координаты клетки
	 * @param {boolean} [checkCoordinateIsInsideMap=true] - Проверять, что клетка внутри карты
	 */
	isCanShootHere = (coordinates: TCoordinates, checkCoordinateIsInsideMap = true): boolean => {
		if (checkCoordinateIsInsideMap && !this.isPositionInsideMap(coordinates)) {
			return false;
		} else {
			const cellStatus = this.getCellStatus(coordinates);
			return (cellStatus !== CellStatus.BURNING
				&& cellStatus !== CellStatus.DESTROYED
				&& cellStatus !== CellStatus.MISSED);
		}
	};
}
