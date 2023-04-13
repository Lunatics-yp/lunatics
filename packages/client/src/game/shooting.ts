import {GameMechanic} from './gameMechanic';
import {SpaceModule} from './spaceModule';
import {SpaceGround} from './spaceGround';
import {TCellStatus, TCoordinates, TShootRespond} from './typing';

// Класс стрельбы по игровому полю
export class Shooting extends GameMechanic {

	constructor(
		moonGround: SpaceGround,
		modules: SpaceModule[],
	) {
		super(moonGround, modules);
	}

	/**
	 * Метод выстрела по игровому полю
	 * @param {TCoordinates} coordinates - Координата для выстрела
	 * @returns {TShootRespond} - Возвращает объект с результатом выстрела
	 * @description Метод выстрела по игровому полю
	 * - `hadShoot` (boolean): Был ли произведён выстрел
	 * - `hit` (boolean): Было ли попадание в лунный модуль
	 * - `destroyed` (boolean): Было ли полное уничтожение лунного модуля
	 */
	shoot = (coordinates: TCoordinates): TShootRespond => {
		// Метод нанесения урона по лунному модулю
		const hit = () => {
			const lunarModule = SpaceModule.findLunarModule(this.getLunarModules(), coordinates);
			if (!lunarModule) {
				throw new Error('Не найден LunarModule по заданным координатам!');
			}
			const hitRespond = lunarModule.hit(coordinates);
			// Выводим в консоль результаты выстрела (для разработчика)
			console.log(hitRespond);
			if (hitRespond.destroyed && hitRespond.lunarModule) {
				return destroy(hitRespond.lunarModule);
			} else {
				this.getMoonGround().setCellStatus(coordinates, TCellStatus.BURNING);
				return {
					hadShoot: true,
					hit: true,
				};
			}
		};

		// Метод уничтожения лунного модуля
		// Вызывается, если лунный модуль вернул destroyed: true
		const destroy = (lunarModule: SpaceModule) => {
			const lunarModuleCoordinates = lunarModule.getMapPosition();
			for (const mapCoordinates of lunarModuleCoordinates) {
				this.getMoonGround().setCellStatus(mapCoordinates, TCellStatus.DESTROYED);
			}
			return {
				hadShoot: true,
				hit: true,
				destroy: true,
			};
		};

		// Метод промаха
		const miss = () => {
			this.getMoonGround().setCellStatus(coordinates, TCellStatus.MISSED);
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
				case TCellStatus.OCCUPIED:
					return hit();
				case TCellStatus.EMPTY:
					return miss();
			}
		}

		console.log('Выстрел не был произведён');
		return {
			hadShoot: false,
		};
	};

}
