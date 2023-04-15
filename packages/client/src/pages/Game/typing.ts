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
};

export type Ship = {
	id: number;
	size: number;
	startPosition: Coord;
	position: Coord;
	color?: string | undefined;
	borderColor?: string | undefined;
	killed?: boolean;
	cells: Array<Coord>;
};

export type Element = {
	x: number;
	y: number;
	width: number;
	height: number;
};
