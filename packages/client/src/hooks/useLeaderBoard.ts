import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {leaderBoardSelectors} from 'client/src/stores/reducers/leaderBoard/leaderBoardSlice';
import {getAllLeader} from 'client/src/stores/reducers/leaderBoard/leaderBoardThunks';
import {useAuth} from './useAuth';
import {leaderboardAPI} from '../api/leaderboardAPI';
import {TEAM_NAME, RATING_FIELD_NAME} from '../api/constants';

export const useLeaderBoard = () => {
	const dispatch = useAppDispatch();
	const leaderBoardState = useAppSelector(leaderBoardSelectors.leaderBoardState);
	const user = useAuth();
	const [page, setPage] = useState(0);

	useEffect(() => {
		console.log('user', user);

		if (!user) return;

		const {id: userId, login: userName} = user;

		//запрос добавления очков для юзера
		const score = Math.floor(Math.random() * (10 - 0 + 1) + 0);

		leaderboardAPI.addUserToLeaderboard({
			ratingFieldName: RATING_FIELD_NAME,
			data: {
				id: userId,
				name: userName,
				[RATING_FIELD_NAME]: score,
			},
			teamName: TEAM_NAME,
		});

		// запрос для лидеров команды
		leaderboardAPI.getAllLeaderByTeam({
			ratingFieldName: RATING_FIELD_NAME,
			cursor: 0,
			limit: 15,
		});

	}, [user]);

	useEffect(() => {
		//запрос за всеми лидерами
		dispatch(getAllLeader(page));
	}, [page]);

	return {leaderBoardState, setPage, page};
};
