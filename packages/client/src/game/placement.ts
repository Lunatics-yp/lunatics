import {GameMechanic} from './gameMechanic';
import {LunarModule} from './lunarModule';
import {MoonGround} from './moonGround';
import {
	MoonGroundCellStatus,
	TLunarModulesTypesToBePlacement,
	TCoordinates,
} from './typing';

// Класс режима размещения лунных модулей
export class Placement extends GameMechanic{

	constructor(
		moonGround: MoonGround,
		modulesTypesToBePlacement: TLunarModulesTypesToBePlacement,
	) {
		const modules: LunarModule[] = [];
		// Перебираем полученный типы и формы лунных модулей и создаём экземпляры LunarModule
		for (const moduleData of modulesTypesToBePlacement) {
			const {name, shape, count} = moduleData;
			for (let x = 0; x < count; x++) {
				modules.push(new LunarModule({name, shape}));
			}
		}
		super(moonGround, modules);
	}

	/**
Метод размещения модуля на игровом поле
@param {LunarModule} lunarModule - Экземпляр LunarModule, который будет размещён
@param {TCoordinates} position - Координаты "головы" лунного модуля
@param {boolean} [rotate90=false] - Поворот на 90 градусов
	 */
	locateModuleToGround = (
		lunarModule: LunarModule,
		position: TCoordinates,
		rotate90 = false,
	) => {
		const shape = lunarModule.getShape();
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
			if (!this.getMoonGround().getCanPlaceCellHere(mapCoordinate)) {
				result = false;
			}
		}
		// Если проверка прошла успешна - помечаем ячейки на поле как занятые
		// И передаём лунному модулю массив занимаемых на поле координат
		if (result) {
			for (const mapCoordinate of mapCoordinates) {
				this.getMoonGround().setCellStatus(
					{x: mapCoordinate.x, y: mapCoordinate.y},
					MoonGroundCellStatus.OCCUPIED);
			}
			lunarModule.setLocatedToMap(mapCoordinates);
		}
		return result;
	};

	// Метод очистки игрового поля и сброса координат лунных модулей
	clear = () => {
		this.getMoonGround().clear();
		for (const lunarModule of this.getLunarModules()) {
			lunarModule.unsetLocatedToMap();
		}
		console.log('Игровое поле очищено');
	};

	// Метод рандомной расстановки всех лунных моделей
	randomLocateAllModulesToGround = () => {
		// Кол-во попыток на каждую ячейку. Вычислено эксперементально.
		const cyclesPerOneCell = 10;
		const {width: mapWidth, height: mapHeight} = this.getMoonGround().getMapSize();
		// Лимит для цикла (во избежание бесконечного цикла)
		const cyclesLimit = mapWidth * mapHeight * cyclesPerOneCell;
		// Кол-во основных попыток (циклов)
		let cyclesCount = 0;
		// Кол-во подциклов
		let subCyclesCount = 0;
		// Общее кол-во лунных модулей
		const modulesCount = this.getLunarModules().length;
		// Кол-во размещённых на поле можулей
		let locatedModulesCount: number = 0;
		// Засекаем время
		const timeStart = performance.now();
		do {
			cyclesCount++;
			// В начале каждой попытки очищаем поле и модули
			this.clear();
			// Перебираем все лунные модули
			for (const lunarModule of this.getLunarModules()) {
				let isLocated = false;
				let thisSubCycle = 0;
				// Подцикл - попылка разместить текущий лунный модуль на карте
				do {
					thisSubCycle++;
					const randomX = Math.floor(Math.random() * (mapWidth + 1));
					const randomY = Math.floor(Math.random() * (mapHeight + 1));
					const randomRotate90 = Math.random() >= 0.5;
					// Пытаемся разместить модуль по текущим координатам
					// Возвращает boolean успеха
					isLocated = this.locateModuleToGround(
						lunarModule,
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
		// Вычисляем, все ли лунные модули были размерещны на поле
		const isAllModulesLocated = locatedModulesCount === modulesCount;
		// Если нет, то очищаем карту
		if (!isAllModulesLocated) {
			this.clear();
		}
		// Выводим инфу для разработчика в консоль
		const timeSpent = Math.round(performance.now() - timeStart);
		console.log(`Рандомная расстановка. Успех = ${isAllModulesLocated}`);
		console.log(`циклов = ${cyclesCount}, подциклов = ${subCyclesCount}, ${timeSpent}ms`);
		// На текущем этапе метод ничего не возвращает
		// В будущем, скорее всего, будет возвращать результат и в случае неудачи
		// покажем игроку сообщение об ошибке.
	};
}
