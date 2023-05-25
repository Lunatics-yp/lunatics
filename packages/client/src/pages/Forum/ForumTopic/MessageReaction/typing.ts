import {REACTIONS} from 'client/src/config/constants';

export type TMessageReactionProps = {
	count: number;
	type: REACTIONS;
	messageId: number;
	isReacted: boolean;
	onReactionMessage: (isReacted?: boolean) => void;
};
