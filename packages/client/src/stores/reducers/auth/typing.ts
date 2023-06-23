export type TAuthState = {
	user: TUser | null;
	isLoading: boolean;
	error: string;
	theme?: string | null;
  };

export type TUser = {
	id: number;
	login: string;
	firstName: string;
	secondName: string;
	displayName: string;
	avatar: string | null;
	phone: string;
	email: string;
};

export type TTheme = {
	userId: number;
	themeName: string;
};

export type TForumUser = {
	id: number;
	name: string;
	user_id: number;
	created_at: number;
};

export type TTopicUser = {
	id: number;
	name: string;
	forum_id: number;
	user_id: number;
	created_at: number;
};

export type TMessageUser = {
	id: number;
	user_id: number;
	text: string;
	topic_id: number;
	parent_message_id: number | null;
	created_at: number;
};
