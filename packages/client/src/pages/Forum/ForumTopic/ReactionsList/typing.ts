import {REACTIONS} from 'client/src/config/constants';

export type TReactionList = {
	onReact: (type: REACTIONS) => void;
};
