import '@testing-library/jest-dom';
import {Placement} from 'client/src/game/placement';
import {Shooting} from 'client/src/game/shooting';
import {SpaceGround} from 'client/src/game/spaceGround';
import {SpaceModule} from 'client/src/game/spaceModule';
import {CellStatus, TCoordinates, TShape, TShapesList} from 'client/src/game/typing';

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

describe('SpaceModule Class', () => {
	let module: SpaceModule;
	const name = 'Г-образный';
	const shape: TShape = [
		{x: 0, y: 0},
		{x: 0, y: 1},
		{x: 1, y: 1},
	];

	beforeEach(() => {
		module = new SpaceModule({name, shape});
	});

	test('Проверяем данные только что созданного модуля', () => {
		const info = module.info;
		expect(info.name).toBe(name);
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
			name: 'Г-образный',
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
