import {
	TCoordinates,
	TFixedCoordinates, TLunarModuleHitRespond,
	TLunarModuleProps,
} from './typing';

// Класс лунного модуля (аналог корабля из Морского Боя)
export class LunarModule {
	private readonly _name: string; // Название
	private readonly _shape: TFixedCoordinates[]; // Форма (массив координат относительно "головы"
	private readonly _size: number; // Кол-во занимаемых ячеек
	private _mapCoordinates: TCoordinates[] = []; // Координаты на игровом поле
	private _isLocated: boolean = false;  // Установлен ли на игровом поле
	private _isAlive: boolean = true; // Остались ли целые ячейки
	private _aliveCellsCount: number; // Количество целых ячеек

	constructor(data: TLunarModuleProps) {
		const {name, shape} = data;
		this._name = name;
		this._shape = shape;
		const size = shape.length;
		this._size = size;
		this._aliveCellsCount = size;
	}

	// Форма лунного модуля
	getShape = () => {
		return this._shape;
	};

	// Координаты на игровом поле
	getMapPosition = () => {
		return this._mapCoordinates;
	};

	// Установить координаты на игровом поле
	setLocatedToMap = (coordinates: TCoordinates[]) => {
		if (coordinates.length !== this._size) {
			throw new Error('Количество координат отличается от размера');
		}
		this._isLocated = true;
		this._mapCoordinates = coordinates;
	};

	// Сбросить координаты на игровом поле
	unsetLocatedToMap = () => {
		this._isLocated = false;
		this._mapCoordinates = [];
	};

	/**
	* Найти модуль по координатам на игровом поле
	* @param {LunarModule[]} lunarModules - Искомый лунный модуль
	* @param {TCoordinates} mapCoordinates - Координаты на игровом поле
	* @returns {LunarModule | null} - Вощвращает экземпляр LunarModule или null
	*/
	static findLunarModule = (
		lunarModules: LunarModule[],
		mapCoordinates: TCoordinates,
	): LunarModule | null => {
		for (const lunarModule of lunarModules) {
			for (const lunarModuleCellCoordinates of lunarModule._mapCoordinates) {
				if (lunarModuleCellCoordinates.x === mapCoordinates.x
					&& lunarModuleCellCoordinates.y === mapCoordinates.y
				) {
					return lunarModule;
				}
			}
		}
		return null;
	};

	//
	/**
	 * Выстрел по лунному модулю
	 * @param {TCoordinates} mapCoordinates - Координата на игровом поле
	 * @returns {TLunarModuleHitRespond} - Вощвращает объект с результатом выстрела
	 * @description
	 * - `destroyed` (boolean): Было ли полное уничтожение лунного модуля
	 * - `lunarModule` (LunarModule): Экземпляр уничтоженного лунного модуля
	 */
	hit = (mapCoordinates: TCoordinates): TLunarModuleHitRespond => {
		// Проверяем, действительно ли по заданным координатам текущий лунный модуль
		if (LunarModule.findLunarModule([this], mapCoordinates) === this) {
			this._aliveCellsCount--; // Отнимаем одну "жизнь", минусуем целую ячейку
			if (this._aliveCellsCount > 0) {
				return {
					destroyed: false,
				};
			} else if (this._aliveCellsCount === 0) {
				// Если целых ячеек не осталось, то ставим статус "убит"
				this._isAlive = false;
				return {
					destroyed: true,
					lunarModule: this,
				};
			} else {
				throw new Error('Здоровье Lunar Module ниже нуля');
			}
		} else {
			throw new Error('Неверно выбран Lunar Module для получения урона');
		}
	};
}
