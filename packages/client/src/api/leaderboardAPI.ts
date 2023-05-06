import {api} from './request';
import {
	TLeaderboard, TAddLeaderboard,
} from './typing';

export const leaderboardAPI = {
	getAllLiders: (data: TLeaderboard) => (
		api.post<any>('leaderboard/all', data)
	),
	addUserToLeaderboard: (data: TAddLeaderboard) => (
		api.post<any>('leaderboard', data)
	),

	getAllLidersByTeam: (data: TLeaderboard, teamName: string) => (
		api.post<any>(`leaderboard/${teamName}`, data)
	),
};
