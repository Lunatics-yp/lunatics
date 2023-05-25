import {createAsyncThunk} from '@reduxjs/toolkit';
import {forumdAPI} from 'client/src/api/forum';
import {
	createForumRequest, ForumListRequest,
} from 'client/src/api/typingForum';

//Для взаимодействия с асинхронными actions используем createAsyncThunk.
export const createForum = createAsyncThunk(
	'forum/createForum',
	async (data: createForumRequest, thunkAPI) => {
		try {
			return await forumdAPI.createForum(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const getAllForums = createAsyncThunk(
	'forum/getAllForums',
	async (data: ForumListRequest, thunkAPI) => {
		try {
			return await forumdAPI.getAllForums(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

// export const createForum = createAsyncThunk(
// 	'forum/createForum',
// 	async (data: ForumForm, thunkAPI) => {
// 		try {
// 			return await forumdAPI.createForum(data);
// 		} catch (e) {
// 			throw thunkAPI.rejectWithValue(e);
// 		}
// 	},
// );

// export const getTopicById = createAsyncThunk(
// 	'forum/getTopicById',
// 	async (data: ForumForm, thunkAPI) => {
// 		try {
// 			return await forumdAPI.getTopicById(data);
// 		} catch (e) {
// 			throw thunkAPI.rejectWithValue(e);
// 		}
// 	},
// );

// export const createTopic = createAsyncThunk(
// 	'forum/createTopic',
// 	async (data: ForumForm, thunkAPI) => {
// 		try {
// 			return await forumdAPI.createTopic(data);
// 		} catch (e) {
// 			throw thunkAPI.rejectWithValue(e);
// 		}
// 	},
// );

// export const createMessage = createAsyncThunk(
// 	'forum/createMessage',
// 	async (data: ForumForm, thunkAPI) => {
// 		try {
// 			return await forumdAPI.createMessage(data);
// 		} catch (e) {
// 			throw thunkAPI.rejectWithValue(e);
// 		}
// 	},
// );

export const forumThunks = {getAllForums, createForum};
