import {
	TCellStatus,
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
	status: TCellStatus.EMPTY,
};

// Класс игрового поля
export class SpaceGround {

	private readonly _map: TMap; // Карта игрового поля, двумерный массив статусов ячеек

	constructor(data: TSpaceGroundProps) {
		// Статус для первоначального заполнения клеток.
		// Используется для заполнения клеток вражеского поля статусом Unknown, а своего Empty
		const {initStatus = TCellStatus.EMPTY} = data;
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
		const height = this._map.length - 1;
		const width = this._map[0].length - 1;
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
			&& coordinates.y <= mapHeight
			&& coordinates.x <= mapWidth);
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
				&& this.map[oneCoordinate.y][oneCoordinate.x].status !== TCellStatus.EMPTY
			) {
				result = false;
			}
		}

		return result;
	};

	// Установить статус клетки игрового поля
	setCellStatus = (coordinates: TCoordinates, status: TCellStatus): void => {
		// Внутри карты X и Y меняются местами для двумерного массива
		this.map[coordinates.y][coordinates.x].status = status;
	};

	// Получить статус клетки игрового поля
	getCellStatus = (coordinates: TCoordinates): TCellStatus => {
		// Внутри карты X и Y меняются местами для двумерного массива
		return this.map[coordinates.y][coordinates.x].status;
	};

	// Узнать, можно ли по выбранной координате стрелять
	// Нельзя стрелять, если координата вне границ игрового поля,
	// или если по координате уже был произведён выстрел
	isCanShootHere = (coordinates: TCoordinates): boolean => {
		if (!this.isPositionInsideMap(coordinates)) {
			return false;
		} else {
			const cellStatus = this.getCellStatus(coordinates);
			return (cellStatus !== TCellStatus.BURNING
				&& cellStatus !== TCellStatus.DESTROYED
				&& cellStatus !== TCellStatus.MISSED);
		}
	};
}