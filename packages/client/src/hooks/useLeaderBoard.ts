import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {leaderBoardSelectors} from 'client/src/stores/reducers/leaderBoard/leaderBoardSlice';
import {getAllLiders} from 'client/src/stores/reducers/leaderBoard/leaderBoardThunks';

export const TEAM_NAME = 'myTeam';

export const useLeaderBoard = () => {
	const dispatch = useAppDispatch();
	const leaderBoardState = useAppSelector(leaderBoardSelectors.leaderBoardState);
	// const user = useAuth();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/semi
		dispatch(getAllLiders())
	}, []);

	return leaderBoardState;

};
