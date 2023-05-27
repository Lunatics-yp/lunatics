import type {TForum, TTopic, TMessage, TMessageReaction} from 'server/api/models';

type TForumAction = 'forum.list' | 'forum.create' | 'forum.delete';
type TTopicAction = 'topic.list' | 'topic.create' | 'topic.delete';
type TMessageAction = 'message.list' | 'message.create' | 'message.delete';
type TThemeAction = 'theme.get' | 'theme.change' ;

export type TPostData = {
	action: TForumAction | TTopicAction | TMessageAction | TThemeAction;
	data: object;

export type TApiAction = TForumAction & TTopicAction & TMessageAction;
export type TApiData = TForum & TTopic & TMessage & TMessageReaction;

export type TPostData = {
	action: TApiAction;
	data: TApiData;
};

export type TApiResponseData = {
	reason?: string;
	data?: object;
};
