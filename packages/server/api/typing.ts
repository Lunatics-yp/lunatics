import type {TForum, TTopic, TMessage, TMessageReaction, TUserTheme} from './models';
import type {TRequestWithUserData} from '../authMiddleware/typing';
import type {Response} from 'express';

type TForumAction = 'forum.list' | 'forum.create' | 'forum.delete';
type TTopicAction = 'topic.list' | 'topic.create' | 'topic.delete';
type TMessageAction = 'message.list' | 'message.create' | 'message.delete';
type TThemeAction = 'theme.get' | 'theme.change' ;

export type TApiAction = TForumAction & TTopicAction & TMessageAction & TThemeAction;
export type TApiData = TForum & TTopic & TMessage & TMessageReaction & TUserTheme;

export type TPostData = {
	action: TApiAction;
	data: TApiData;
};

export type TApiResponseData = {
	reason?: string;
	data?: object;
};

export type TReactionResponse = {
	message_id?: number;
	user_id?: number;
	reaction_id?: number;
	deleted?: number;
	Message: unknown;
};

export type TApi = (
	req: TRequestWithUserData,
	res: Response
) => Promise<void>;
