import {shuffleArray} from 'client/src/utils';
import {Shooting} from '../shooting';
import {TCoordinates, TShootRespond} from '../typing';

export class AI {
	private readonly _emenyShooting: Shooting;

	constructor(enemyShooting: Shooting) {
		this._emenyShooting = enemyShooting;
	}

	private _generateRandomCoordinate = (limits: {
		minX?: number;
		minY?: number;
		maxX: number;
		maxY: number;
	}): TCoordinates => {
		const {
			minX = 0,
			minY = 0,
			maxX,
			maxY,
		} = limits;
		const x = (Math.floor(Math.random() * (maxX - minX)) + minX);
		const y = (Math.floor(Math.random() * (maxY - minY)) + minY);
		return {x, y};
	};

	// Метод выстрела ИИ по карте игрока
	shoot = (): TShootRespond => {
		// Проверяем, есть ли вообще клетки для стрельбы
		if (!this._emenyShooting.ground.isAnyCellForShooting()) {
			throw new Error('Нет клеток, доступных для стрельбы');
		}

		// Проверяем, есть ли горящие клетки с прошлого выстрела
		// Если есть, то обстреливаем ближайшие
		const alreadyBurning = this._emenyShooting.ground.isAnyCellBurning();
		if (alreadyBurning.isBurning) {
			if(alreadyBurning.coordinates.length<1){
				throw new Error('Список горящих клеток пуст');
			}
			const burningCoordinatesList = alreadyBurning.coordinates;
			const targetCoordinatesList: TCoordinates[] = [];
			// Собираем массив клеток вокруг горящих. Есть две возможные ситуации
			if(burningCoordinatesList.length===1){
				// 1. Если горящая клетка только одна, то собираем список клеток вокруг неё.
				// Берём клетки левее, правее, ниже и выше горящей
				const burningCoordinates=burningCoordinatesList[0];
				for (let a = -1; a <= 1; a+=2) {
					targetCoordinatesList.push({
						x: burningCoordinates.x,
						y: burningCoordinates.y + a,
					});
					targetCoordinatesList.push({
						x: burningCoordinates.x + a,
						y: burningCoordinates.y,
					});
				}
			}else{
				// 2. Если горящих клеток несколько, то вычисляем направление,
				// как они расположены: горизонтально или вертикально
				const isVertical = burningCoordinatesList[0].x===burningCoordinatesList[1].x;
				for(const burningCoordinates of burningCoordinatesList){
					for (let a = -1; a <= 1; a+=2) {
						if(isVertical){
							targetCoordinatesList.push({
								x: burningCoordinates.x,
								y: burningCoordinates.y + a,
							});
						}else{
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
			for(const coordinates of targetCoordinatesList){
				if(this._emenyShooting.ground.isCanShootHere(coordinates)){
					// Стреляем и возвращаем результат
					return this._emenyShooting.shoot(coordinates);
				}
			}
			throw new Error('Ошибка попытки стрельбы вокруг горящей клетки');
		}

		// Если горящих нет, то делаем выстрел по случайной клетке
		const {width: mapWidth, height: mapHeight} = this._emenyShooting.ground.map.size;
		let coordinates: TCoordinates | null = null;
		// Генерируем координаты до тех пор, пока не найдём клетку, по которой можно выстрелить
		do {
			coordinates = this._generateRandomCoordinate({maxX: mapWidth, maxY: mapHeight});
		} while (!this._emenyShooting.ground.isCanShootHere(coordinates));
		// Стреляем и возвращаем результат
		return this._emenyShooting.shoot(coordinates);
	};
}
