export type TForumState = {
	forums: TForum[];
	messages: TMessage[];
	discussions: TDiscussion[];
	error: string;
	isLoading: boolean;
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
	subtext?: string;
	parentid?: number;
};
