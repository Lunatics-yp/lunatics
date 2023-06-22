import {TMessages, TMessageUser} from 'client/src/api/typingForum';

export type TForumDiscussionColumnProps = {
	id: number;
	name: string;
	lastMessage: TMessages & {User?: TMessageUser};
};
