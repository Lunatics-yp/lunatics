import {shuffleArray} from 'client/src/utils';
import {Shooting} from '../shooting';
import {TCoordinates, TShootRespond} from '../typing';

export class AI {
	private readonly _enemyShooting: Shooting;

	constructor(enemyShooting: Shooting) {
		this._enemyShooting = enemyShooting;
	}

	// Метод выстрела ИИ по карте игрока
	shoot = async (): Promise<TShootRespond> => {
		// Массив всех доступных клеток для стрельбы и массив текущих горящих клеток
		const {targets, burnings} = this._enemyShooting.ground.getAllCellForShootingAndBurning();

		// Проверяем, есть ли вообще клетки для стрельбы
		if (!targets.length) {
			throw new Error('Нет клеток, доступных для стрельбы');
		}

		// Проверяем, есть ли горящие клетки с прошлого выстрела
		// Если есть, то обстреливаем ближайшие
		if (burnings.length) {
			const targetCoordinatesList: TCoordinates[] = [];
			// Собираем массив клеток вокруг горящих. Есть две возможные ситуации
			if (burnings.length === 1) {
				// 1. Если горящая клетка только одна, то собираем список клеток вокруг неё.
				// Берём клетки левее, правее, ниже и выше горящей
				const burningCoordinates = burnings[0];
				for (let a = -1; a <= 1; a += 2) {
					targetCoordinatesList.push({
						x: burningCoordinates.x,
						y: burningCoordinates.y + a,
					});
					targetCoordinatesList.push({
						x: burningCoordinates.x + a,
						y: burningCoordinates.y,
					});
				}
			} else {
				// 2. Если горящих клеток несколько, то вычисляем направление,
				// как они расположены: горизонтально или вертикально
				const isVertical = burnings[0].x === burnings[1].x;
				for (const burningCoordinates of burnings) {
					for (let a = -1; a <= 1; a += 2) {
						if (isVertical) {
							targetCoordinatesList.push({
								x: burningCoordinates.x,
								y: burningCoordinates.y + a,
							});
						} else {
							targetCoordinatesList.push({
								x: burningCoordinates.x + a,
								y: burningCoordinates.y,
							});
						}
					}
				}
			}
			// Перемешиваем массив (чтобы стрельнуть по случайной клетке из массива
			shuffleArray(targetCoordinatesList);
			// Проходимся по массиву и находим клетку, по которой можно выстрелить.
			// Делать это нужно, потому что в массиве есть как уже горящая клетка,
			// Так и могут быть промахи от предыдущих выстрелов
			for (const coordinates of targetCoordinatesList) {
				if (this._enemyShooting.ground.isCanShootHere(coordinates)) {
					// Стреляем и возвращаем результат
					return this._enemyShooting.shoot(coordinates);
				}
			}
			throw new Error('Ошибка попытки стрельбы вокруг горящей клетки');
		}

		// Если горящих нет, то делаем выстрел по случайной клетке из списка целей
		const randomIndex = Math.floor(Math.random() * targets.length);
		const coordinates = targets[randomIndex];
		return this._enemyShooting.shoot(coordinates);
	};
}
