import {GameMechanic} from './gameMechanic';
import {SpaceModule} from './spaceModule';
import {SpaceGround} from './spaceGround';
import {CellStatus, TCoordinates, TShootRespond} from './typing';

// Класс стрельбы по игровому полю
export class Shooting extends GameMechanic {

	constructor(
		ground: SpaceGround,
		modules: SpaceModule[],
	) {
		super(ground, modules);
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
			const module = SpaceModule.findSpaceModule(this.modules, coordinates);
			if (!module) {
				throw new Error('Не найден SpaceModule по заданным координатам!');
			}
			const hitRespond = module.hit(coordinates);
			// Выводим в консоль результаты выстрела (для разработчика)
			console.log(hitRespond);
			if (hitRespond.destroyed && hitRespond.spaceModule) {
				return destroy(hitRespond.spaceModule);
			} else {
				this.ground.setCellStatus(coordinates, CellStatus.BURNING);
				return {
					hadShoot: true,
					hit: true,
				};
			}
		};

		// Метод уничтожения лунного модуля
		// Вызывается, если лунный модуль вернул destroyed: true
		const destroy = (spaceModule: SpaceModule) => {
			const moduleCoordinates = spaceModule.mapPosition;
			for (const mapCoordinates of moduleCoordinates) {
				this.ground.setCellStatus(mapCoordinates, CellStatus.DESTROYED);
			}
			return {
				hadShoot: true,
				hit: true,
				destroy: true,
			};
		};

		// Метод промаха
		const miss = () => {
			this.ground.setCellStatus(coordinates, CellStatus.MISSED);
			return {
				hadShoot: true,
				hit: false,
			};
		};

		// Проверяем, можно ли по указанным координатам произвести выстрел
		const isCanShoot = this.ground.isCanShootHere(coordinates);
		if (isCanShoot) {
			// Если да, то узнаём статус клетки и выполняем ранение (hit) или промах (miss)
			const prevStatus = this.ground.getCellStatus(coordinates);
			switch (prevStatus) {
				case CellStatus.OCCUPIED:
					return hit();
				case CellStatus.EMPTY:
					return miss();
			}
		}

		console.log('Выстрел не был произведён');
		return {
			hadShoot: false,
		};
	};

}
