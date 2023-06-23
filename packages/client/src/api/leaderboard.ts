import {localApi} from 'client/src/api/request/localApi';
import type {TLeaderboard} from './typing';

export const leaderboardAPI = {

	getAllLeader: (data: TLeaderboard) => (
		localApi.post('/leaderboard', {action: 'leaderboard.list', data})
	),

	addGameResult: (isWinner: boolean) => {
		localApi.post('/leaderboard', {action: 'leaderboard.set', data: {isWinner}});
	},
};
