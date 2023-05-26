import {createAsyncThunk} from '@reduxjs/toolkit';
import {forumdAPI} from 'client/src/api/forum';
import {
	createForumRequest, ForumListRequest, createTopicRequest, createMessageRequest,
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

export const createTopic = createAsyncThunk(
	'forum/getAllForums',
	async (data: createTopicRequest, thunkAPI) => {
		try {
			return await forumdAPI.createTopic(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const getAllTopics = createAsyncThunk(
	'forum/getAllForums',
	async (data: createTopicRequest, thunkAPI) => {
		try {
			return await forumdAPI.getAllTopics(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const createMessage = createAsyncThunk(
	'forum/getAllForums',
	async (data: createMessageRequest, thunkAPI) => {
		try {
			return await forumdAPI.createMessage(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const getAllMessages = createAsyncThunk(
	'forum/getAllForums',
	async (data: createMessageRequest, thunkAPI) => {
		try {
			return await forumdAPI.getAllMessages(data);
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

// eslint-disable-next-line max-len
export const forumThunks = {getAllForums, createForum, createTopic, getAllTopics, createMessage, getAllMessages};
