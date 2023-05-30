import {TForums, TMessages, TTopics} from 'client/src/api/typingForum';

export type TForumState = {
	forums: TForums[];
	messages: TMessages[];
	topics: TTopics[];
	error: string;
	isLoading: boolean;
};
