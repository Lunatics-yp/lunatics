import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {leaderBoardSelectors} from 'client/src/stores/reducers/leaderboard/leaderboardSlice';
import {getAllLeader} from 'client/src/stores/reducers/leaderboard/leaderboardThunks';

export const useLeaderBoard = () => {
	const dispatch = useAppDispatch();
	const leaderBoardState = useAppSelector(leaderBoardSelectors.leaderBoardState);
	const [page, setPage] = useState(0);

	useEffect(() => {
		//запрос за всеми лидерами
		dispatch(getAllLeader(page));
	}, [page]);

	return {leaderBoardState, setPage, page};
};
