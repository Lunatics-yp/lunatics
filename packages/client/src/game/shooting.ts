import {GameMechanic} from './gameMechanic';
import {LunarModule} from './lunarModule';
import {MoonGround} from './moonGround';
import {MoonGroundCellStatus, TCoordinates, TMoonGroundShootingRespond} from './typing';

// Класс стрельбы по игровому полю
export class Shooting extends GameMechanic {

	constructor(
		moonGround: MoonGround,
		modules: LunarModule[],
	) {
		super(moonGround, modules);
	}

	/**
	* Метод выстрела по игровому полю
	* @param {TCoordinates} coordinates - Координата для выстрела
	* @returns {TMoonGroundShootingRespond} - Возвращает объект с результатом выстрела
	* @description Метод выстрела по игровому полю
	* - `hadShoot` (boolean): Был ли произведён выстрел
	* - `hit` (boolean): Было ли попадание в лунный модуль
	* - `destroyed` (boolean): Было ли полное уничтожение лунного модуля
	 */
	shoot = (coordinates: TCoordinates): TMoonGroundShootingRespond => {
		// Метод нанесения урона по лунному модулю
		const hit = () => {
			const lunarModule = LunarModule.findLunarModule(this.getLunarModules(), coordinates);
			if (lunarModule) {
				const hitRespond = lunarModule.hit(coordinates);
				// Выводим в консоль результаты выстрела (для разработчика)
				console.log(hitRespond);
				if (hitRespond.destroyed && hitRespond.lunarModule) {
					return destroy(hitRespond.lunarModule);
				} else {
					this.getMoonGround().setCellStatus(coordinates, MoonGroundCellStatus.BURNING);
					return {
						hadShoot: true,
						hit: true,
					};
				}
			} else {
				throw new Error('Не найден LunarModule по заданным координатам!');
			}
		};

		// Метод уничтожения лунного модуля
		// Вызывается, если лунный модуль вернул destroyed: true
		const destroy = (lunarModule: LunarModule) => {
			const lunarModuleCoordinates = lunarModule.getMapPosition();
			for (const mapCoordinates of lunarModuleCoordinates) {
				this.getMoonGround().setCellStatus(mapCoordinates, MoonGroundCellStatus.DESTROYED);
			}
			return {
				hadShoot: true,
				hit: true,
				destroy: true,
			};
		};

		// Метод промаха
		const miss = () => {
			this.getMoonGround().setCellStatus(coordinates, MoonGroundCellStatus.MISSED);
			return {
				hadShoot: true,
				hit: false,
			};
		};

		// Проверяем, можно ли по указанным координатам произвести выстрел
		const isCanShoot = this.getMoonGround().getCanShootHere(coordinates);
		if (isCanShoot) {
			// Если да, то узнаём статус клетки и выполняем ранение (hit) или промах (miss)
			const prevStatus = this.getMoonGround().getCellStatus(coordinates);
			switch (prevStatus) {
			case MoonGroundCellStatus.OCCUPIED:
				return hit();
			case MoonGroundCellStatus.EMPTY:
				return miss();
			}
		}

		console.log('Выстрел не был произведён');
		return {
			hadShoot: false,
		};
	};

}
