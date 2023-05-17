import {createAsyncThunk} from '@reduxjs/toolkit';
import {leaderboardAPI} from 'client/src/api/leaderboard';
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

export const leaderboardThunks = {getAllLeader};
