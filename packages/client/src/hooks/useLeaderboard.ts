import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {leaderboardSelectors} from 'client/src/stores/reducers/leaderboard/leaderboardSlice';
import {getAllLeader} from 'client/src/stores/reducers/leaderboard/leaderboardThunks';

export const useLeaderboard = () => {
	const dispatch = useAppDispatch();
	const leaderboardState = useAppSelector(leaderboardSelectors.leaderboardState);
	const [page, setPage] = useState(0);

	useEffect(() => {
		//запрос за всеми лидерами
		dispatch(getAllLeader(page));
	}, [page]);

	return {leaderboardState, setPage, page};
};
