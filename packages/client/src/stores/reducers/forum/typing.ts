import {REACTIONS} from 'client/src/config/constants';

export type TForumState = {
	forums: TForum[];
	messages: TMessage[];
	discussions: TDiscussion[];
};

export type TForum = {
	id: number;
	title: string;
	discussionsCount: number;
	answersCount: number;
};

export type TDiscussion = {
	id: number;
	title: string;
	lastAuthorName: string;
	date: string;
};

export type TMessage = {
	id: number;
	isOwner: boolean;
	text: string;
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
