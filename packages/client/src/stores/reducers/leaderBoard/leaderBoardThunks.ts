import {createAsyncThunk} from '@reduxjs/toolkit';
// import {TEAM_NAME} from 'client/src/hooks/useLeaderBoard';
import {leaderboardAPI} from 'client/src/api/leaderboardAPI';
import {RATING_FIELD_NAME, LEADER_LIMIT_USERS} from 'client/src/api/constants';

export const getAllLeader = createAsyncThunk(
	'leaderboard/getAllLeader',
	async (page: number, thunkAPI) => {
		try {
			return await leaderboardAPI.getAllLeader({
				ratingFieldName: RATING_FIELD_NAME,
				cursor: page * LEADER_LIMIT_USERS,
				limit: LEADER_LIMIT_USERS,
			});
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const leaderBoardThunks = {getAllLeader};
