import {TLeaderboardResponse} from 'client/src/api/typing';

export type TLeaderBoardState = {
	leaders: TLeaderboardResponse[];
	error: string;
	isLoading: boolean;
};
