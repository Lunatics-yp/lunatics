import {REACTIONS} from 'client/src/config/constants';

export type TMessageReactionProps = {
	count: number;
	type: REACTIONS;
	activeReaction?: REACTIONS | null;
	onReactionMessage: (type: REACTIONS) => void;
};
