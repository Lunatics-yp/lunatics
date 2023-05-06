import {createAsyncThunk} from '@reduxjs/toolkit';
// import {TEAM_NAME} from 'client/src/hooks/useLeaderBoard';
import {leaderboardAPI} from 'client/src/api/leaderboardAPI';

export const getAllLiders = createAsyncThunk(
	'leaderboard/getAllLiders',
	async (_, thunkAPI) => {
		try {
			return await leaderboardAPI.getAllLiders({
				ratingFieldName: 'score',
				cursor: 0,
				limit: 15,
			});
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const leaderBoardThunks = {getAllLiders};
