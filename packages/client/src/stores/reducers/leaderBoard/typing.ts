import {TLeaderboardData} from 'client/src/api/typing';

export type TLeaderBoardState = {
	leaders: TLeaderboardData[];
	error: string;
	isLoading: boolean;
};
