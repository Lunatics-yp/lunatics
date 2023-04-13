import {createAsyncThunk} from '@reduxjs/toolkit';
import {authAPI} from 'client/src/api/auth';
import {TLoginRequestData} from 'client/src/api/typing';

// Для взаимодействия с асинхронными actions используем createAsyncThunk.
export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, thunkAPI) => {
		try {
			return await authAPI.getUser();
		} catch(e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const login = createAsyncThunk(
	'auth/login',
	async (data: TLoginRequestData, thunkAPI ) => {
		try {
			return await authAPI.login(data);
		} catch(e) {
			throw thunkAPI.rejectWithValue(e);
		}
	},
);

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) =>{
		try {
			return  await authAPI.logout();
		} catch(e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const authThunks = {fetchUser, login};
