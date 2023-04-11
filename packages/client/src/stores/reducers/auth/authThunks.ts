import {createAsyncThunk} from '@reduxjs/toolkit';
import {authAPI} from 'client/src/api/auth';

// Для взаимодействия с асинхронными actions используем createAsyncThunk.
export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, thunkAPI) => {
		try {
			const response = await authAPI.getUser();
			return response;
		} catch(e) {
			return thunkAPI.rejectWithValue('Не удалось получить данные');

		}
	},
);

export const authThunks = {fetchUser};
