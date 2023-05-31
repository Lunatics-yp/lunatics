import {createAsyncThunk} from '@reduxjs/toolkit';
import {authAPI} from 'client/src/api/auth';
import {userAPI} from 'client/src/api/user';
import {
	TChangeUserRequestData,
	TLoginRequestData,
	TRegisterRequestData,
} from 'client/src/api/typing';
import {TTheme} from 'client/src/stores/reducers/auth/typing';
import {themesApi} from 'client/src/api/themes';

// Для взаимодействия с асинхронными actions используем createAsyncThunk.
export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, thunkAPI) => {
		try {
			return await authAPI.getUser();
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const login = createAsyncThunk(
	'auth/login',
	async (data: TLoginRequestData, thunkAPI) => {
		try {
			return await authAPI.login(data);
		} catch (e) {
			throw thunkAPI.rejectWithValue(e);
		}
	},
);

export const register = createAsyncThunk(
	'auth/register',
	async (data: TRegisterRequestData, thunkAPI) => {
		try {
			return await authAPI.register(data);
		} catch (e) {
			throw thunkAPI.rejectWithValue(e);
		}
	},
);

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) => {
		try {
			return await authAPI.logout();
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const changeUserData = createAsyncThunk(
	'profile/changeUser',
	async (data: TChangeUserRequestData, thunkAPI) => {
		try {
			return await userAPI.changeUser(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const changeUserAvatar = createAsyncThunk(
	'profile/changeAvatar',
	async (data: FormData, thunkAPI) => {
		try {
			return await userAPI.changeAvatar(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const changeUserTheme = createAsyncThunk(
	'theme/change',
	async (data: TTheme, thunkAPI) => {
		console.log('changeUserTheme data', data);

		try {
			const response = await themesApi.changeUserTheme(data);
			console.log('changeUserTheme response', response);
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const authThunks = {
	fetchUser,
	login,
	register,
	logout,
	changeUserData,
	changeUserAvatar,
	changeUserTheme,
};
