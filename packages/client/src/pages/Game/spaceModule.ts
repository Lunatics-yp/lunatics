import {
	TCoordinates,
	TFixedCoordinates, THitRespond,
	TSpaceModuleProps,
} from './typing';

// Класс лунного модуля (аналог корабля из Морского Боя)
export class SpaceModule {
	private readonly _name: string; // Название
	private readonly _shape: TFixedCoordinates[]; // Форма (массив координат относительно "головы"
	private readonly _size: number; // Кол-во занимаемых ячеек
	private _mapCoordinates: TCoordinates[] = []; // Координаты на игровом поле
	private _isLocated: boolean = false;  // Установлен ли на игровом поле
	private _isAlive: boolean = true; // Остались ли целые ячейки
	private _aliveCellsCount: number; // Количество целых ячеек

	constructor(data: TSpaceModuleProps) {
		const {name, shape} = data;
		this._name = name;
		this._shape = shape;
		const size = shape.length;
		this._size = size;
		this._aliveCellsCount = size;
	}

	// Заглушка, чтобы TS не ругался на неиспользуемые параметры класса
	get info() {
		return {
			name: this._name,
			isLocated: this._isLocated,
			isAlive: this._isAlive,
		};
	}

	// Форма лунного модуля
	get shape(): TFixedCoordinates[] {
		return this._shape;
	}

	// Координаты на игровом поле
	get mapPosition(): TCoordinates[] {
		return this._mapCoordinates;
	}

	set mapPosition(coordinates: TCoordinates[]) {
		if (coordinates.length !== this._size) {
			throw new Error('Количество координат отличается от размера');
		}
		this._isLocated = true;
		this._mapCoordinates = coordinates;
	}

	// Сбросить координаты на игровом поле
	unsetLocatedToMap = () => {
		this._isLocated = false;
		this._mapCoordinates = [];
	};

	/**
	 * Найти модуль по координатам на игровом поле
	 * @param {SpaceModule[]} spaceModules - Искомый лунный модуль
	 * @param {TCoordinates} mapCoordinates - Координаты на игровом поле
	 * @returns {SpaceModule | null} - Возвращает экземпляр LunarModule или null
	 */
	static findSpaceModule = (
		spaceModules: SpaceModule[],
		mapCoordinates: TCoordinates,
	): SpaceModule | null => {
		for (const module of spaceModules) {
			for (const moduleCellCoordinates of module.mapPosition) {
				if (moduleCellCoordinates.x === mapCoordinates.x
					&& moduleCellCoordinates.y === mapCoordinates.y
				) {
					return module;
				}
			}
		}
		return null;
	};

	//
	/**
	 * Выстрел по лунному модулю
	 * @param {TCoordinates} mapCoordinates - Координата на игровом поле
	 * @returns {THitRespond} - Возвращает объект с результатом выстрела
	 * @description
	 * - `destroyed` (boolean): Было ли полное уничтожение лунного модуля
	 * - `lunarModule` (LunarModule): Экземпляр уничтоженного лунного модуля
	 */
	hit = (mapCoordinates: TCoordinates): THitRespond => {
		// Проверяем, действительно ли по заданным координатам текущий лунный модуль
		if (SpaceModule.findSpaceModule([this], mapCoordinates) !== this) {
			throw new Error('Неверно выбран Lunar Module для получения урона');
		}
		this._aliveCellsCount--; // Отнимаем одну "жизнь", минусуем целую ячейку
		if (this._aliveCellsCount < 0) {
			throw new Error('Здоровье Lunar Module ниже нуля');
		}
		if (this._aliveCellsCount === 0) {
			// Если целых ячеек не осталось, то ставим статус "убит"
			this._isAlive = false;
			return {
				destroyed: true,
				spaceModule: this,
			};
		} else {
			return {
				destroyed: false,
			};
		}
	};
}