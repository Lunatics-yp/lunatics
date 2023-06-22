import {TShapesList, TSize} from 'client/src/game/typing';

export type TModes = 'Стандартный' | 'Лунный кратер' | 'Галактический размах';

export type TModeData = {
	map: TSize;
	ships: TShapesList;
};

export type TModesData = {
	[key in TModes]: TModeData;
};
