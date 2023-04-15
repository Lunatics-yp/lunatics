import {Element} from './typing';

export const isOverElement = (firstElement: Element, secondElement: Element) => {
	return (
		firstElement.x >= secondElement.x &&
    firstElement.x + firstElement.width <= secondElement.x + secondElement.width &&
    firstElement.y + firstElement.height <= secondElement.y + secondElement.height
	);
};
