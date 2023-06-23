import '@testing-library/jest-dom';
import {Placement} from './placement';
import {SpaceGround} from './spaceGround';
import {CellStatus, TCoordinates, TShape, TShapesList} from './typing';

describe('Placement Class', () => {
	const size = 5;
	const modulesNum = 2;
	const shape: TShape = [
		{x: 0, y: 0},
		{x: 0, y: 1},
		{x: 1, y: 1},
	];
	const shapesList: TShapesList = [
		{
			shape: shape,
			count: modulesNum,
		},
	];
	let ground: SpaceGround;
	let placement: Placement;

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
	});

	test('Проверяем верно ли созданы лунные модули', () => {
		const modules = placement.modules;
		expect(modules.length).toBe(modulesNum);
		expect(modules[0].shape).toEqual(shape);
	});

	test('Проверяем размещение модуля на карте', () => {
		const module = placement.modules[0];
		placement.locateModuleToGround(module, {x: 1, y: 1});
		const positionArray: TCoordinates[] = [
			{x: 1, y: 1},
			{x: 1, y: 2},
			{x: 2, y: 2},
		];
		expect(module.info.isLocated).toBe(true);
		expect(module.mapPosition).toEqual(positionArray);
		expect(ground.getCellStatus({x: 1, y: 1})).toBe(CellStatus.OCCUPIED);
		expect(ground.getCellStatus({x: 1, y: 2})).toBe(CellStatus.OCCUPIED);
		expect(ground.getCellStatus({x: 2, y: 2})).toBe(CellStatus.OCCUPIED);
		expect(ground.getCellStatus({x: 0, y: 0})).toBe(CellStatus.EMPTY);
		expect(ground.getCellStatus({x: 1, y: 0})).toBe(CellStatus.EMPTY);
		expect(ground.getCellStatus({x: 3, y: 3})).toBe(CellStatus.EMPTY);
	});

	test('Проверяем сброс расстановки', () => {
		const module = placement.modules[0];
		placement.locateModuleToGround(module, {x: 1, y: 1});
		placement.clear();
		expect(module.info.isLocated).toBe(false);
		expect(module.mapPosition).toEqual([]);
		expect(ground.getCellStatus({x: 1, y: 1})).toBe(CellStatus.EMPTY);
		expect(ground.getCellStatus({x: 1, y: 2})).toBe(CellStatus.EMPTY);
		expect(ground.getCellStatus({x: 2, y: 2})).toBe(CellStatus.EMPTY);
	});

	test('Проверяем размещение за пределами карты', () => {
		const module = placement.modules[0];
		const result1 = placement.locateModuleToGround(module, {x: -1, y: 0});
		const result2 = placement.locateModuleToGround(module, {x: 0, y: -1});
		const result3 = placement.locateModuleToGround(module, {x: size + 1, y: size + 1});
		const result4 = placement.locateModuleToGround(module, {x: size - 1, y: size - 1});
		const result5 = placement.locateModuleToGround(module, {x: 1, y: 1});
		expect(result1).toBe(false);
		expect(result2).toBe(false);
		expect(result3).toBe(false);
		expect(result4).toBe(false);
		expect(result5).toBe(true);
	});

	test('Проверяем размещение второго модуля', () => {
		const moduleA = placement.modules[0];
		const moduleB = placement.modules[1];
		const result0 = placement.locateModuleToGround(moduleA, {x: 0, y: 0});
		const result1 = placement.locateModuleToGround(moduleB, {x: 0, y: 0});
		const result2 = placement.locateModuleToGround(moduleB, {x: 1, y: 0});
		const result3 = placement.locateModuleToGround(moduleB, {x: 2, y: 0});
		const result4 = placement.locateModuleToGround(moduleB, {x: 3, y: 0});
		expect(result0).toBe(true);
		expect(result1).toBe(false);
		expect(result2).toBe(false);
		expect(result3).toBe(false);
		expect(result4).toBe(true);
	});

	test('Проверяем рандомную расстановку', () => {
		placement.randomLocateAllModulesToGround();
		expect(placement.modules[0].info.isLocated).toBe(true);
		expect(placement.modules[1].info.isLocated).toBe(true);
	});

});
