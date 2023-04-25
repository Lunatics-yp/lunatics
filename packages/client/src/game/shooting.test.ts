import '@testing-library/jest-dom';
import {Placement} from './placement';
import {Shooting} from './shooting';
import {SpaceGround} from './spaceGround';
import {SpaceModule} from './spaceModule';
import {CellStatus, TShape, TShapesList} from './typing';

describe('Shooting Class', () => {
	const size = 5;
	const shape: TShape = [
		{x: 0, y: 0},
		{x: 0, y: 1},
		{x: 1, y: 1},
	];
	const shapesList: TShapesList = [
		{
			name: 'Г-образный',
			shape: shape,
			count: 1,
		},
	];
	let ground: SpaceGround;
	let placement: Placement;
	let shooting: Shooting;
	let module: SpaceModule;

	beforeEach(() => {
		ground = new SpaceGround({
			width: size,
			height: size,
			initStatus: CellStatus.EMPTY,
		});
		placement = new Placement(
			ground,
			shapesList,
		);
		shooting = new Shooting(
			ground,
			placement.modules,
		);
		module = placement.modules[0];
	});

	test('Проверяем стрельбу по пустому полю и по уже отстрелянной клетке', () => {
		const coordinates = {x: 1, y: 1};
		const result1 = shooting.shoot(coordinates);
		const result2 = shooting.shoot(coordinates);
		expect(result1.hadShoot).toBe(true);
		expect(result2.hadShoot).toBe(false);
	});

	test('Проверяем стрельбу по ячейке за пределами карты', () => {
		const result1 = shooting.shoot({x: -1, y: 0});
		const result2 = shooting.shoot({x: 0, y: size + 1});
		expect(result1.hadShoot).toBe(false);
		expect(result2.hadShoot).toBe(false);
	});

	test('Проверяем урон по модулю', () => {
		const coordinates = {x: 1, y: 1};
		placement.locateModuleToGround(module, coordinates);
		const result = shooting.shoot(coordinates);
		expect(result.hadShoot).toBe(true);
		expect(result.hit).toBe(true);
		expect(result.destroyed).toBe(false);
		expect(module.info.isAlive).toBe(true);
	});

	test('Проверяем промах', () => {
		placement.locateModuleToGround(module, {x: 1, y: 1});
		const result = shooting.shoot({x: 0, y: 0});
		expect(result.hadShoot).toBe(true);
		expect(result.hit).toBe(false);
	});

	test('Проверяем уничтожение модуля', () => {
		placement.locateModuleToGround(module, {x: 1, y: 1});
		const result1 = shooting.shoot({x: 1, y: 1});
		const result2 = shooting.shoot({x: 1, y: 2});
		const result3 = shooting.shoot({x: 2, y: 2});
		expect(result1.destroyed).toBe(false);
		expect(result2.destroyed).toBe(false);
		expect(result3.destroyed).toBe(true);
		expect(module.info.isAlive).toBe(false);
	});
});
