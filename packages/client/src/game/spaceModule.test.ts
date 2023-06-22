import '@testing-library/jest-dom';
import {SpaceModule} from './spaceModule';
import {TShape} from './typing';

describe('SpaceModule Class', () => {
	let module: SpaceModule;
	const shape: TShape = [
		{x: 0, y: 0},
		{x: 0, y: 1},
		{x: 1, y: 1},
	];

	beforeEach(() => {
		module = new SpaceModule({shape});
	});

	test('Проверяем данные только что созданного модуля', () => {
		const info = module.info;
		expect(info.isLocated).toBe(false);
		expect(info.isAlive).toBe(true);
		expect(module.shape).toEqual(shape);
	});

	test('Проверяем запись и чтение и сброс координаты модуля', () => {
		// Запись и чтение позиции
		const position = {x: 99, y: 99};
		const positionArray = Array.from({length: 3}, () => position);
		module.mapPosition = positionArray;
		expect(module.mapPosition).toEqual(positionArray);
		expect(module.info.isLocated).toBe(true);
		// Сброс позиции
		module.unsetLocatedToMap();
		expect(module.info.isLocated).toBe(false);
		expect(module.mapPosition).toEqual([]);
	});
});
