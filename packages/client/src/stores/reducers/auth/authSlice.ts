import {createSlice} from '@reduxjs/toolkit';
import {TAuthState} from './typing';
import {authThunks} from './authThunks';

const initialState: TAuthState = {
	isLoading: false,
	error: '',
	user: null,
};

// Slice - функция, которая автоматически генерирует Action Creators и типы Action
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
		// fetchUser
			.addCase(authThunks.fetchUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(authThunks.fetchUser.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.fetchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message as string;
				state.user = null;
			})
		// login
			.addCase(authThunks.login.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message as string;
			})
		// register
			.addCase(authThunks.register.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message as string;
			})
		// logout
			.addCase(authThunks.logout.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(authThunks.logout.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.logout.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message as string;
			})
		;
	},
});

export default authSlice.reducer;
