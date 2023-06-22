import {sequelizeToObject} from '../utils/sequelizeToObject';
import {Leaderboard, Users} from '../models';
import type {TLeaderboard} from '../models';
import type {TApiResponseData} from '../typing';
import type {TLeaderboardList, TLeaderboardSet} from './typing';

// Апи Лидерборда
export const leaderboardApi = {
	set: async (data: TLeaderboardSet): Promise<TApiResponseData> => {
		const {isWinner, user_id} = data;
		if (isWinner === undefined) {
			return {reason: 'Неправильные параметры для метода set Leaderboard'};
		}
		try {

			const currentLeaderboard = {
				games: 0,
				wins: 0,
			};

			const currentLeaderboardFromDB = await Leaderboard.findOne({
				where: {user_id},
			}) as TLeaderboard | null;

			if (currentLeaderboardFromDB) {
				currentLeaderboard.games = currentLeaderboardFromDB.games;
				currentLeaderboard.wins = currentLeaderboardFromDB.wins;
			}

			currentLeaderboard.games++;
			if (isWinner) {
				currentLeaderboard.wins++;
			}

			const newLeaderboard = await Leaderboard.upsert({
				user_id,
				games: currentLeaderboard.games,
				wins: currentLeaderboard.wins,
			});

			return {
				data: sequelizeToObject<TLeaderboard>(newLeaderboard[0]),
			};
		} catch (e) {
			console.error(e);
			return {reason: 'Ошибка при создании строки в методе set Leaderboard'};
		}
	},
	list: async (data: TLeaderboardList): Promise<TApiResponseData> => {
		const {
			order = 'wins',
			limit = '10',
			offset = '0',
		} = data;

		if (!(order === 'wins' || order === 'games')) {
			return {reason: 'Неправильный параметр order для метода create forum'};
		}

		const parsedLimit = limit === '' ? 0 : parseInt(limit);
		const parsedOffset = offset === '' ? 0 : parseInt(offset);

		try {
			const leaderboard = await Leaderboard.findAll({
				order: [[order, 'DESC']],
				limit: parsedLimit,
				offset: parsedOffset,
				include: [Users],
			});

			return {
				data: sequelizeToObject<TLeaderboard>(leaderboard),
			};
		} catch (e) {
			console.error(e);
			return {reason: 'Ошибка при создании строки в методе set Leaderboard'};
		}
	},
};
