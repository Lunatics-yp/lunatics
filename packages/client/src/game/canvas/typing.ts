import {GameBattle} from 'client/src/game/battle';
import {TCoordinates} from 'client/src/game/typing';
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
	miss: HTMLImageElement;
	modules: {
		horizontal: HTMLImageElement;
		vertical: HTMLImageElement;
	}[][];
};
