export type TLeaderBoardState = {
	leaders: TLeader[];
	error: string;
	isLoading: boolean;
};

export type TLeader = {
	// замена на number | string | undefined не помогло)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;
	id: number;
	score: number;
	playerId?: number;
	first_name?: string;
	name?: string;
	avatarURL?: string;
};
