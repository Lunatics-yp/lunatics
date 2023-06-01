import {TShapesList, TSize} from 'client/src/game/typing';

export type TModes = 'Обычный' | 'Необычный';

export type TModeData = {
	map: TSize;
	ships: TShapesList;
};

export type TModesData = {
	[key in TModes]: TModeData;
};
