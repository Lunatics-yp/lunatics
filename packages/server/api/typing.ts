import type {TUserTheme} from './theme/typing';

type TForumAction = 'forum.list' | 'forum.create' | 'forum.delete';
type TTopicAction = 'topic.list' | 'topic.create' | 'topic.delete';
type TMessageAction = 'message.list' | 'message.create' | 'message.delete';
type TThemeAction = 'theme.get' | 'theme.change' ;

export type TApiAction = TForumAction & TTopicAction & TMessageAction & TThemeAction;
export type TApiData = TUserTheme;

export type TPostData = {
	action: TApiAction;
	data: TApiData;
};
