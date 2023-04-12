import {LunarModule} from './lunarModule';

// Статус клетки
/* eslint-disable no-unused-vars */
export enum MoonGroundCellStatus {
	UNKNOWN = 'UNKNOWN',
	EMPTY = 'EMPTY',
	OCCUPIED = 'OCCUPIED',
	MISSED = 'MISSED',
	BURNING = 'BURNING',
	DESTROYED = 'DESTROYED',
}
/* eslint-enable no-unused-vars */

// Тип для клетки игрового поля
export type TMoonGroundCell = {
	status: MoonGroundCellStatus;
};

// Тип для игрового поля
export type TMoonGroundMap = TMoonGroundCell[][];

// Тип координаты
export type TCoordinates = {
	x: number;
	y: number;
};

// Тип координаты для одной ячейки формы лунного модуля
export type TFixedCoordinates = {
	readonly x: number;
	readonly y: number;
};

// Тип данных для конструктора класса MoonGround
export type TMoonGroundData = {
	width: number;
	height: number;
	initStatus?: MoonGroundCellStatus; // Статус для первоначального заполнения клеток
};

// Тип формы лунного модуля
export type TLunarModuleShape = TFixedCoordinates[];

// Тип пропсов для конструктора лунного модуля
export type TLunarModuleProps = {
	readonly name: string;
	readonly shape: TLunarModuleShape;
};

// Тип списка типов лунных модулей для расстановки
export type TLunarModulesTypesToBePlacement = {
	name: string;
	shape: TFixedCoordinates[];
	count: number;
}[];

// Тип для ответа получения урона по Lunar Module
export type TLunarModuleHitRespond = {
	destroyed: boolean;
	lunarModule? : LunarModule;
};

// Тип для ответа на выстрел по карте
export type TMoonGroundShootingRespond = {
	hadShoot: boolean;
	hit?: boolean;
	destroyed?: boolean;
};

// ВРЕМЕННЫЙ тип для отображения карты на экране
export type TMoonGroundDisplayProps = {
	map: TMoonGroundMap;
	rerender: boolean;
};
