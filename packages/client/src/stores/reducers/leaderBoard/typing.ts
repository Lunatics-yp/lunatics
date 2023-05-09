export type TLeaderBoardState = {
	leaders: TLeader[];
	error: string;
	isLoading: boolean;
};

export type TLeader = {
	[x: string]: string | number | undefined;
	id: number;
	score: number;
	playerId?: number;
	first_name?: string;
	name?: string;
	avatarURL?: string;
};
