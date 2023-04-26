import {MoonGroundCellStatus, Drawing} from './constants';

export type TCoordiante = {
	x: number;
	y: number;
};

export type TRect = {
	x: number;
	y: number;
	width: number;
	height: number;
	fillColor?: string;
	borderColor?: string;
	direction: string;
};

export type TShip = {
	id: number;
	size: number;
	startPosition: TCoordiante;
	position: TCoordiante;
	color?: string | undefined;
	borderColor?: string | undefined;
	killed?: boolean;
	direction: string;
	cells: Array<TCoordiante>;
	type: Drawing.Cell;
};

export type Element = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export type MoonGroundCell = {
	x: number;
	y: number;
	status: MoonGroundCellStatus;
};
