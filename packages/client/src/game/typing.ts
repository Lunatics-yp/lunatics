import {SpaceModule} from './spaceModule';

// Статус клетки
/* eslint-disable no-unused-vars */
export enum CellStatus {
	UNKNOWN = 'UNKNOWN',
	EMPTY = 'EMPTY',
	OCCUPIED = 'OCCUPIED',
	MISSED = 'MISSED',
	BURNING = 'BURNING',
	DESTROYED = 'DESTROYED',
}

/* eslint-enable no-unused-vars */

// Тип для клетки игрового поля
export type TCell = {
	status: CellStatus;
};

// Тип для игрового поля
export type TMap = TCell[][];

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

// Тип размера карты
export type TSize = {
	width: number;
	height: number;
};

// Тип данных для конструктора класса SpaceGround
export type TSpaceGroundProps = {
	initStatus?: CellStatus; // Статус для первоначального заполнения клеток
} & TSize;

// Тип формы лунного модуля
export type TShape = TFixedCoordinates[];

// Тип пропсов для конструктора лунного модуля
export type TSpaceModuleProps = {
	readonly shape: TShape;
};

// Тип списка типов лунных модулей для расстановки
export type TShapesList = {
	shape: TFixedCoordinates[];
	count: number;
}[];

// Тип для ответа получения урона по Space Module
export type THitRespond = {
	destroyed: boolean;
	spaceModule?: SpaceModule;
};

// Тип для ответа на выстрел по карте
export type TShootRespond = {
	hadShoot: boolean;
	hit?: boolean;
	destroyed?: boolean;
};

// ВРЕМЕННЫЙ тип для отображения карты на экране
export type TSpaceGroundDisplayProps = {
	map: TMap;
	rerender: unknown;
};

export type TPlayerStatistic = {
	shoots: number;
	hit: number;
	miss: number;
	destroyed: number;
};

export type TBattleStatistic = {
	player: TPlayerStatistic;
	enemy: TPlayerStatistic;
	time: string;
	winner: number;
};
