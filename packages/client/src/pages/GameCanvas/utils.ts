import {Element, Ship, MoonGroundCell} from './typing';

// проверка находится ли мышка в области одного из кораблей или нет
export const isOverElement = (firstElement: Element, secondElement: Element): boolean => {

	return (
		firstElement.x >= secondElement.x &&
		firstElement.x + firstElement.width <= secondElement.x + secondElement.width &&
		firstElement.y >= secondElement.y &&
		firstElement.y + firstElement.height <= secondElement.y + secondElement.height
	);
};

export const getRandomInRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isSomeShipOccupiedCell = (ships: Ship[], currentCell: MoonGroundCell): boolean => {
	return ships.some((_ship) => {
		const {cells = []} = _ship;
		if (cells.length === 0) return false;
		return cells.some(_cell => {
			return _cell.x === currentCell.x && _cell.y === currentCell.y;
		});
	});
};
