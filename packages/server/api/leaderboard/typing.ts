import type {TApiData, TApiResponseData} from '../typing';

export type TApiFunction = (data: TApiData) => Promise<TApiResponseData>;

export type TLeaderboardSet = {
	user_id: number;
	isWinner: boolean;
};

export type TLeaderboardList = {
	offset?: string;
	limit?: string;
	order?: 'wins' | 'games';
};
