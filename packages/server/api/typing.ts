type TForumAction = 'forum.list' | 'forum.create' | 'forum.delete';
type TTopicAction = 'topic.list' | 'topic.create' | 'topic.delete';
type TMessageAction = 'message.list' | 'message.create' | 'message.delete';
type TThemeAction = 'theme.get' | 'theme.change' ;

export type TPostData = {
	action: TForumAction | TTopicAction | TMessageAction | TThemeAction;
	data: object;
};
