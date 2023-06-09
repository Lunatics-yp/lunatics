import {REACTIONS} from 'client/src/config/constants';
import {TNullObject} from './typing';

export type TCreateForumRequest = {
	action: string;
	data: TCreateForumRequestData;
};

export type TCreateForumRequestData = {
	name: string;
};

export type TCreateForumResponse = {
	data: TCreateForumResponseData;
};

export type TCreateForumResponseData = {
	id: number;
	name: string;
	user_id: number;
	created_at: number;
};

export type TForumListRequest = {
	action: string;
	data: Record<string, never>;
};

export type TForumListResponse = {
	data: TForums[];
};

export type TForums = {
	id: number;
	name: string;
	user_id: number;
	created_at: number;
};

export type TCreateTopicRequest = {
	action: string;
	data: TCreateTopicRequestData;
};

type TCreateTopicRequestData = {
	name: string;
	forum_id: number;
};

export type TCreateTopicResponse = {
	data: TCreateTopicResponseData;
};

export type TCreateTopicResponseData = {
	id: number;
	name: string;
	forum_id: number;
	user_id: number;
	created_at: number;
	LastMessage: TMessages;
};

export type TTopicListRequest = {
	action: string;
	data: TTopicListRequestData;
};

export type TTopicListRequestData = {
	forum_id: number;
};

export type TTopicListResponse = {
	data: TTopics[];
};

export type TTopics = {
	id: number;
	name: string;
	forum_id: number;
	user_id: number;
	created_at: number;
	LastMessage: TMessages;
};

export type TCreateMessageRequest = {
	action: string;
	data: TCreateMessageRequestData;
};

type TCreateMessageRequestData = {
	topic_id: number;
	parent_message_id: number | null ;
	text: string;
};

export type TCreateMessageResponse = {
	data: TCreateMessageResponseData;
};

export type TCreateMessageResponseData = {
	id: number;
	user_id: number;
	text: string;
	topic_id: number;
	parent_message_id: number | null;
	created_at: number;
};

export type TMessageListRequest = {
	action: string;
	data: TMessageListRequestData;
};

export type TMessageListRequestData = {
	topic_id: number;
	parent_message_id: number | null;
};

export type TMessageListResponse = {
	data: TMessages[];
};

export type TMessages = {
	id: number;
	user_id: number;
	text: string;
	topic_id: number;
	parent_message_id: number | null;
	created_at: number;
	User: TMessageUser;
	Reactions: TReactionsMessage;
	UserReaction: TReaction | TNullObject;
};

export type TMessageUser = {
	id: number;
	login: string;
	display_name: string;
	avatar: string;
};

export type TReactionsMessage = Record<string, number>;

export type TReaction = {
	id: number;
	message_id: number;
	user_id: number;
	reaction_id: REACTIONS;
};
