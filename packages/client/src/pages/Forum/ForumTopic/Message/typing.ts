import {REACTIONS} from 'client/src/config/constants';

export type TMessageProps = {
	message: TMessage;
	messages: TMessage[];
	isReactionListActive?: number | null;
	setSelectedParent: (id: number | null) => void;
	setIsReactionListActive: (isActive: number | null) => void;

};

export type TMessage = {
	id: number;
	isOwner?: boolean;
	text: string;
	subtext?: string;
	parent_message_id?: number;
	reactions: TReactions[];
	activeReaction: REACTIONS | null;
};

export type TReactions = {
	reactionId: REACTIONS;
	count: number;
};

export type TReaction = {
	messageId: number;
	userId: number;
	reactionId: REACTIONS;
};
