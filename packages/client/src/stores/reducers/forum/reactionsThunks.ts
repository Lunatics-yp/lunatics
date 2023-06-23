import {createAsyncThunk} from '@reduxjs/toolkit';
import {reactionsAPI} from 'client/src/api/reactions';
import {TDeleteReactionRequestData, TSetReactionRequestData} from 'client/src/api/typing';

export const setReaction = createAsyncThunk(
	'reaction/set',
	async (data: TSetReactionRequestData, thunkAPI) => {
		try {
			return await reactionsAPI.setReaction(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const deleteReaction = createAsyncThunk(
	'reaction/delete',
	async (data: TDeleteReactionRequestData, thunkAPI) => {
		try {
			return await reactionsAPI.deleteReaction(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const reactionThunks = {setReaction, deleteReaction};
