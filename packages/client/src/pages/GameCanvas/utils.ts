import {Element} from './typing';

// проверка находится ли мышка в области одного из кораблей или нет
export const isOverElement = (firstElement: Element, secondElement: Element) => {
	return (
		firstElement.x >= secondElement.x &&
		firstElement.x + firstElement.width <= secondElement.x + secondElement.width &&
		firstElement.y >= secondElement.y &&
		firstElement.y + firstElement.height <= secondElement.y + secondElement.height
	);
};
