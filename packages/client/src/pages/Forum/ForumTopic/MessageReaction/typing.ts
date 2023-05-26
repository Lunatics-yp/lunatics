import {REACTIONS} from 'client/src/config/constants';

export type TMessageReactionProps = {
	count: number;
	type: REACTIONS;
	activeReaction: REACTIONS | null;
	isReacted: boolean;
	onReactionMessage: (type: REACTIONS, isReacted: boolean) => void;
};
