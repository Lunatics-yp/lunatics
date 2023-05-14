// import {leaderboardAPI} from 'client/src/api/leaderboard';
// import {TEAM_NAME, RATING_FIELD_NAME} from './../api/constants';
// import { useAuth } from 'client/src/hooks/useAuth';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {leaderBoardSelectors} from 'client/src/stores/reducers/leaderBoard/leaderBoardSlice';
import {getAllLeader} from 'client/src/stores/reducers/leaderBoard/leaderBoardThunks';

export const useLeaderBoard = () => {
	const dispatch = useAppDispatch();
	const leaderBoardState = useAppSelector(leaderBoardSelectors.leaderBoardState);
	const [page, setPage] = useState(0);
	// const user = useAuth();

	useEffect(() => {
		//запрос за всеми лидерами
		dispatch(getAllLeader(page));
	}, [page]);

	// useEffect(() => {
	// 	console.log('user', user);

	// 	if (!user) return;

	// 	const { id: userId, login: userName } = user;

	// 	new Array(1).fill(1).forEach(() => {
	// 		const fight = Math.floor(Math.random() * (10 - 0 + 1) + 0);
	// 		const victories = Math.floor(Math.random() * (10 - 0 + 1) + 0);

	// 		leaderboardAPI.addUserToLeaderboard({
	// 			ratingFieldName: RATING_FIELD_NAME,
	// 			data: {
	// 				id: userId,
	// 				name: userName,
	// 				[RATING_FIELD_NAME]: fight,
	// 				victories,
	// 			},
	// 			teamName: TEAM_NAME,
	// 		});
	// 	});

	// }, [user]);

	return {leaderBoardState, setPage, page};
};
