/* eslint-disable max-len */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {leaderBoardThunks} from './leaderBoardThunks';
import {TLeaderBoardState} from './typing';

const initialState: TLeaderBoardState = {
	isLoading: false,
	error: '',
	leaders: [],
};

export const leaderBoardSlice = createSlice({
	name: 'leaderBoard',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// getAllLeader
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.addCase(leaderBoardThunks.getAllLeader.fulfilled, (state, action: PayloadAction<any>) => { // не смог уйти от any)
				state.isLoading = false;
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
