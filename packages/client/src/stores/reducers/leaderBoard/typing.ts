export type TLeaderBoardState = {
	liders: TLider[];
	error: string;
	isLoading: boolean;
};

export type TLider = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;
	id: number;
	score: number;
	playerId?: number;
	first_name?: string;
	name?: string;
	avatarURL?: string;
};
