import {TLeaderboardResponse} from 'client/src/api/typing';

export type TLeaderboardState = {
	leaders: TLeaderboardResponse[];
	error: string;
	isLoading: boolean;
};
