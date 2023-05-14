import {api} from './request';
import {
	TLeaderboard, TAddLeaderboard, TLeaderboardResponse,
} from './typing';
import {
	TEAM_NAME, LEADER_BOARD_BY_TEAM,
	LEADER_BOARD_URL,
	LEADER_BOARD_All,
} from './constants';

export const leaderboardAPI = {

	getAllLeader: (data: TLeaderboard) => (
		api.post<Array<TLeaderboardResponse>>(LEADER_BOARD_All, data)
	),

	addUserToLeaderboard: (data: TAddLeaderboard) => (
		api.post(LEADER_BOARD_URL, data)
	),

	getAllLeaderByTeam: (data: TLeaderboard, teamName: string = TEAM_NAME) => (
		api.post<Array<TLeaderboardResponse>>(LEADER_BOARD_BY_TEAM(teamName), data)
	),

};
