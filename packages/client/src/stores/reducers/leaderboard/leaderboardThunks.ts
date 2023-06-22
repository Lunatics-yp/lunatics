import {createAsyncThunk} from '@reduxjs/toolkit';
import {leaderboardAPI} from 'client/src/api/leaderboard';
import {LEADER_LIMIT_USERS} from 'client/src/api/constants';

export const getAllLeader = createAsyncThunk(
	'leaderboard/getAllLeader',
	async (page: number, thunkAPI) => {
		try {
			const data = {
				offset: page * LEADER_LIMIT_USERS,
				limit: LEADER_LIMIT_USERS,
			};
			return await leaderboardAPI.getAllLeader(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const leaderboardThunks = {getAllLeader};
