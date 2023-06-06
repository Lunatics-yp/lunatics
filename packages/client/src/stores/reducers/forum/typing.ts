import {TForums, TMessages, TTopics} from 'client/src/api/typingForum';
import {REACTIONS} from 'client/src/config/constants';

export type TForumState = {
	forums: TForums[];
	messages: TMessages[];
	topics: TTopics[];
	error: string;
	isLoading: boolean;
	reactions?: TReactions[];
	activeReaction?: REACTIONS | null;
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
