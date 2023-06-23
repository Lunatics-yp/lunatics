import {TForums, TMessages, TTopics} from 'client/src/api/typingForum';
import {REACTIONS} from 'client/src/config/constants';

export type TForumState = {
	forums: TForums[];
	messages: TMessages[];
	topics: TTopics[];
	error: string;
	isLoading: boolean;
};

export type TReaction = {
	id: number;
	messageId: number;
	userId: number;
	reactionId: REACTIONS;
};
