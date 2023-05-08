import {api} from './request';
import {
	TLeaderboard, TAddLeaderboard, TLeaderboardResponse,
} from './typing';
import {TEAM_NAME} from './constants';

export const leaderboardAPI = {

	getAllLeader: (data: TLeaderboard) => (
		api.post<Array<TLeaderboardResponse>>('leaderboard/all', data)
	),
	addUserToLeaderboard: (data: TAddLeaderboard) => (
		api.post('leaderboard', data)
	),

	getAllLeaderByTeam: (data: TLeaderboard, teamName: string = TEAM_NAME) => (
		api.post<Array<TLeaderboardResponse>>(`leaderboard/${teamName}`, data)
	),
};
