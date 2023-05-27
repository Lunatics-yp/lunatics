import {createAsyncThunk} from '@reduxjs/toolkit';
import {forumdAPI} from 'client/src/api/forum';
import {
	TCreateForumRequest, TForumListRequest,
	TCreateTopicRequest, TCreateMessageRequest,
} from 'client/src/api/typingForum';

//Для взаимодействия с асинхронными actions используем createAsyncThunk.
export const createForum = createAsyncThunk(
	'forum/createForum',
	async (data: TCreateForumRequest, thunkAPI) => {
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
	async (data: TForumListRequest, thunkAPI) => {
		try {
			return await forumdAPI.getAllForums(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const createTopic = createAsyncThunk(
	'forum/createTopic',
	async (data: TCreateTopicRequest, thunkAPI) => {
		try {
			return await forumdAPI.createTopic(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const getAllTopics = createAsyncThunk(
	'forum/getAllTopics',
	async (data: TCreateTopicRequest, thunkAPI) => {
		try {
			return await forumdAPI.getAllTopics(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const createMessage = createAsyncThunk(
	'forum/createMessage',
	async (data: TCreateMessageRequest, thunkAPI) => {
		try {
			return await forumdAPI.createMessage(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const getAllMessages = createAsyncThunk(
	'forum/getAllMessages',
	async (data: TCreateMessageRequest, thunkAPI) => {
		try {
			return await forumdAPI.getAllMessages(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const forumThunks = {
	getAllForums, createForum, createTopic,
	getAllTopics, createMessage, getAllMessages,
};
