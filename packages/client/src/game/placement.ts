import {getRandomArbitrary, getRandomBoolean} from 'client/src/utils';
import {GameMechanic} from './gameMechanic';
import {SpaceModule} from './spaceModule';
import {SpaceGround} from './spaceGround';
import {
	CellStatus,
	TShapesList,
	TCoordinates,
} from './typing';

// Класс режима размещения лунных модулей
export class Placement extends GameMechanic {

	private _isAllModulesLocated = false;

	constructor(
		spaceGround: SpaceGround,
		modulesTypesToBePlacement: TShapesList,
	) {
		const modules: SpaceModule[] = [];
		// Перебираем полученный типы и формы лунных модулей и создаём экземпляры SpaceModule
		for (const moduleData of modulesTypesToBePlacement) {
			const {shape, count} = moduleData;
			for (let x = 0; x < count; x++) {
				modules.push(new SpaceModule({shape}));
			}
		}
		super(spaceGround, modules);
	}

	/**
	 * Метод размещения модуля на игровом поле
	 * @param {SpaceModule} spaceModule - Экземпляр SpaceModule, который будет размещён
	 * @param {TCoordinates} position - Координаты "головы" лунного модуля
	 * @param {boolean} [rotate90=false] - Поворот на 90 градусов
	 */
	locateModuleToGround = (
		spaceModule: SpaceModule,
		position: TCoordinates,
		rotate90 = false,
	) => {
		const shape = spaceModule.shape;
		// Вычисляем координаты на игровом поле для всех ячеек лунного модуля
		const mapCoordinates: TCoordinates[] = [];
		for (const shapeCell of shape) {
			const mapX = position.x + (rotate90 ? shapeCell.y : shapeCell.x);
			const mapY = position.y + (rotate90 ? shapeCell.x : shapeCell.y);
			mapCoordinates.push({x: mapX, y: mapY});
		}
		// Проверяем каждую ячейку, можно ли её разместить на игровом поле
		let result = true;
		for (const mapCoordinate of mapCoordinates) {
			if (!this.ground.isCanPlaceCellHere(mapCoordinate)) {
				result = false;
			}
		}
		// Если проверка прошла успешна - помечаем ячейки на поле как занятые
		// И передаём лунному модулю массив занимаемых на поле координат
		if (result) {
			for (const mapCoordinate of mapCoordinates) {
				this.ground.setCellStatus(
					{x: mapCoordinate.x, y: mapCoordinate.y},
					CellStatus.OCCUPIED);
			}
			spaceModule.mapPosition = mapCoordinates;
		}
		return result;
	};

	// Метод очистки игрового поля и сброса координат лунных модулей
	clear = () => {
		this.ground.clear();
		for (const module of this.modules) {
			module.unsetLocatedToMap();
			module.heal();
		}
	};

	healAllModules = () => {
		for (const module of this.modules) {
			module.heal();
		}
	};

	// Метод рандомной расстановки всех лунных моделей
	randomLocateAllModulesToGround = (printLog: boolean = false) => {
		// Кол-во попыток на каждую ячейку. Вычислено экспериментально.
		const cyclesPerOneCell = 10;
		const {width: mapWidth, height: mapHeight} = this.ground.map.size;
		// Лимит для цикла (во избежание бесконечного цикла)
		const cyclesLimit = mapWidth * mapHeight * cyclesPerOneCell;
		// Кол-во основных попыток (циклов)
		let cyclesCount = 0;
		// Кол-во подциклов
		let subCyclesCount = 0;
		// Общее кол-во лунных модулей
		const modulesCount = this.modules.length;
		// Кол-во размещённых на поле модулей
		let locatedModulesCount: number = 0;
		// Засекаем время
		const timeStart = performance.now();
		do {
			cyclesCount++;
			// В начале каждой попытки очищаем поле и модули
			this.clear();
			// Перебираем все лунные модули
			for (const module of this.modules) {
				let isLocated = false;
				let thisSubCycle = 0;
				// Подцикл - попытка разместить текущий лунный модуль на карте
				do {
					thisSubCycle++;
					const randomX = getRandomArbitrary(0, mapWidth);
					const randomY = getRandomArbitrary(0, mapHeight);
					const randomRotate90 = getRandomBoolean();
					// Пытаемся разместить модуль по текущим координатам
					// Возвращает 'boolean' успеха
					isLocated = this.locateModuleToGround(
						module,
						{x: randomX, y: randomY},
						randomRotate90,
					);
					// Если успех, то прибавляем +1 размещённый модуль и переходим к следующему
					// Если неуспех, то пробуем снова разместить текущий модуль
					if (isLocated) {
						locatedModulesCount++;
					}
				} while (!isLocated && thisSubCycle < cyclesLimit);
				subCyclesCount += thisSubCycle;
			}
			// Если на выходе из цикла не все лунные модули были размещены,
			// то сбрасывает кол-во размещённых лунных модулей и пробуем ещё раз
			if (locatedModulesCount < modulesCount) {
				locatedModulesCount = 0;
			}
		} while (locatedModulesCount < modulesCount && cyclesCount < cyclesLimit);
		// Вычисляем, все ли лунные модули были размещены на поле
		const isAllModulesLocated = locatedModulesCount === modulesCount;
		// Если нет, то очищаем карту
		if (!isAllModulesLocated) {
			this.clear();
		}
		this._isAllModulesLocated = isAllModulesLocated;
		// Выводим информацию для разработчика в консоль
		const timeSpent = Math.round(performance.now() - timeStart);
		const log = `Рандомная расстановка. Успех = ${isAllModulesLocated}\r\n
		циклов = ${cyclesCount}, подциклов = ${subCyclesCount}, ${timeSpent}ms`;
		if (printLog) {
			console.log(log);
		}
		// На текущем этапе метод ничего не возвращает
		// В будущем, скорее всего, будет возвращать результат и в случае неудачи
		// покажем игроку сообщение об ошибке.
	};

	get isModulesLocated(): boolean {
		return this._isAllModulesLocated;
	}
}
