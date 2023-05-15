/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {leaderBoardThunks} from './leaderboardThunks';
import {TLeaderBoardState} from './typing';
import {isErrorAPI} from 'client/src/api/request/utilits';

const initialState: TLeaderBoardState = {
	isLoading: true,
	error: '',
	leaders: [],
};

export const leaderBoardSlice = createSlice({
	name: 'leaderBoard',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(leaderBoardThunks.getAllLeader.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false;
				if (isErrorAPI(action.payload)) {
					state.error = action.payload.reason;
					return;
				}
				state.leaders = action.payload;
			})
			.addCase(leaderBoardThunks.getAllLeader.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(leaderBoardThunks.getAllLeader.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			});
	},
});

export const leaderBoardSelectors = {
	leaderBoardState: (state: RootState) => state.leaderBoardReducer,
};

export default leaderBoardSlice.reducer;
