import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {leaderboardThunks} from './leaderboardThunks';
import {TLeaderboardState} from './typing';
import {isErrorAPI} from 'client/src/api/request/utilits';

const initialState: TLeaderboardState = {
	isLoading: true,
	error: '',
	leaders: [],
};

export const leaderboardSlice = createSlice({
	name: 'leaderboard',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			/* eslint-disable-next-line max-len */
			.addCase(leaderboardThunks.getAllLeader.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false;
				if (isErrorAPI(action.payload)) {
					state.error = action.payload.reason;
					return;
				}
				state.leaders = action.payload;
			})
			.addCase(leaderboardThunks.getAllLeader.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(leaderboardThunks.getAllLeader.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			});
	},
});

export const leaderboardSelectors = {
	leaderboardState: (state: RootState) => state.leaderboardReducer,
};

export default leaderboardSlice.reducer;
