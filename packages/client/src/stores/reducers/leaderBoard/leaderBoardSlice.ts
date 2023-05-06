import {createSlice} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {leaderBoardThunks} from './leaderBoardThunks';
import {TLeaderBoardState} from './typing';

const initialState: TLeaderBoardState = {
	isLoading: false,
	error: '',
	liders: [],
};

export const leaderBoardSlice = createSlice({
	name: 'leaderBoard',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			// getAllLiders
			.addCase(leaderBoardThunks.getAllLiders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.liders = action.payload.map((it) => {
					return {
						...it,
						data: {
							...it.data,
							score: Math.floor(Math.random() * (10 - 0 + 1) + 0),
						},
					};
				});
			})
			.addCase(leaderBoardThunks.getAllLiders.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(leaderBoardThunks.getAllLiders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			});
	},
},
);
export const leaderBoardSelectors = {
	leaderBoardState: (state: RootState) => state.leaderBoardReducer,
};
export default leaderBoardSlice.reducer;
