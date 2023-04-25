import '@testing-library/jest-dom';
import {SpaceGround} from './spaceGround';
import {CellStatus} from './typing';

describe('SpaceGround Class', () => {
	const size = 5;
	let ground: SpaceGround;

	beforeEach(() => {
		ground = new SpaceGround({
			width: size,
			height: size,
			initStatus: CellStatus.UNKNOWN,
		});
	});

	test('Проверяем размер карты', () => {
		const {width, height} = ground.map.size;
		expect(width).toBe(size);
		expect(height).toBe(size);
		expect(ground.map.length).toBe(size);
		expect(ground.map[0].length).toBe(size);
	});

	test('Проверяем метод получения статуса клетки', () => {
		expect(ground.getCellStatus({x: 0, y: 0})).toBe(CellStatus.UNKNOWN);
	});

	test('Проверяем метод установки статуса клетки', () => {
		ground.setCellStatus({x: 0, y: 0}, CellStatus.DESTROYED);
		expect(ground.getCellStatus({x: 0, y: 0})).toBe(CellStatus.DESTROYED);
	});

	test('Проверяем методы проверки координаты', () => {
		expect(ground.isPositionInsideMap({x: 0, y: 0})).toBe(true);
		expect(ground.isPositionInsideMap({x: size + 1, y: 0})).toBe(false);
		expect(ground.isPositionInsideMap({x: 0, y: size + 1})).toBe(false);
		expect(ground.isPositionInsideMap({x: -1, y: -1})).toBe(false);
	});

	test('Проверяем метод очистки карты', () => {
		ground.clear();
		expect(ground.getCellStatus({x: 0, y: 0})).toBe(CellStatus.EMPTY);
	});
});
