import {Element, TShip, MoonGroundCell} from './typing';

// проверка находится ли мышка в области одного из кораблей или нет
export const isOverElement = (firstElement: Element, secondElement: Element): boolean => {

	return (
		firstElement.x + firstElement.width >= secondElement.x &&
		firstElement.x <= secondElement.x + secondElement.width &&
		firstElement.y + firstElement.height >= secondElement.y &&
		firstElement.y <= secondElement.y + secondElement.height
	);
};

export const getRandomInRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isSomeShipOccupiedCell = (ships: TShip[], currentCell: MoonGroundCell): boolean => {
	return ships.some((_ship) => {
		const {cells = []} = _ship;
		return cells.some(_cell => {
			return _cell.x === currentCell.x && _cell.y === currentCell.y;
		});
	});
};
