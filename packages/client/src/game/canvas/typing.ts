import {GameBattle} from 'client/src/game/battle';
import type {TCoordinates} from 'client/src/game/typing';
import {CellStatus} from 'client/src/game/typing';
import {Fn} from 'client/src/types';

export type TCanvas = {
	battle: GameBattle;
	owner: 'player' | 'enemy';
	redraw: number;
	clickCallback?: Fn<unknown, TCoordinates>;
};
export type TSprites = {
	background: HTMLImageElement;
	burn: HTMLImageElement;
	destroyed: HTMLImageElement;
	miss: HTMLImageElement;
	modules: {
		horizontal: HTMLImageElement;
		vertical: HTMLImageElement;
	}[][];
};

export type TDrawnCell = {
	x: number;
	y: number;
	status: CellStatus;
};
