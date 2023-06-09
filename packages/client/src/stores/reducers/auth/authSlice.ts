import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {transformUser} from 'client/src/api/apiTransformers';
import {isUserData} from 'client/src/api/request/utilits';
import {authThunks} from './authThunks';
import {TAuthState} from './typing';

const initialState: TAuthState = {
	isLoading: false,
	error: '',
	user: null,
	theme: null,
};

// Slice - функция, которая автоматически генерирует Action Creators и типы Action
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeTheme(state, {payload}: PayloadAction<string>) {
			state.theme = payload;
		},
	},
	extraReducers: (builder) => {
		builder
		// fetchUser
			.addCase(authThunks.fetchUser.fulfilled, (state, action) => {
				state.isLoading = false;
				if (isUserData(action.payload)) {
					state.theme = action.payload.theme.data;
					state.user = transformUser(action.payload);
				}
			})
			.addCase(authThunks.fetchUser.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.fetchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
				state.user = null;
			})
		// login
			.addCase(authThunks.login.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})
		// register
			.addCase(authThunks.register.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
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
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})
		// changeUserData
			.addCase(authThunks.changeUserData.fulfilled, (state, action) => {
				state.isLoading = false;
				if (isUserData(action.payload)) {
					state.user = transformUser(action.payload);
				}
			})
			.addCase(authThunks.changeUserData.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.changeUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})
		// changeAvatar
			.addCase(authThunks.changeUserAvatar.fulfilled, (state, action) => {
				state.isLoading = false;
				if (isUserData(action.payload)) {
					state.user = transformUser(action.payload);
				}
			})
			.addCase(authThunks.changeUserAvatar.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(authThunks.changeUserAvatar.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			});
	},
});

export const authSelectors = {
	user: (state: RootState) => state.authReducer,
	theme: (state: RootState) => state.authReducer.theme,
};
export const themesActions = authSlice.actions;
export default authSlice.reducer;
