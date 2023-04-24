import {MoonGroundCellStatus, Drawing} from './constants';

export type Coord = {
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

export type Ship = {
	id: number;
	size: number;
	startPosition: Coord;
	position: Coord;
	color?: string | undefined;
	borderColor?: string | undefined;
	killed?: boolean;
	direction: string;
	cells: Array<Coord>;
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
