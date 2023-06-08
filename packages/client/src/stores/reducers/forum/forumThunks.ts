import {createAsyncThunk} from '@reduxjs/toolkit';
import {forumdAPI} from 'client/src/api/forum';
// eslint-disable-next-line max-len
import {TCreateForumRequest, TForumListRequest,TCreateTopicRequest, TCreateMessageRequest, TMessageListRequest} from 'client/src/api/typingForum';

//Для взаимодействия с асинхронными actions используем createAsyncThunk.
const createForum = createAsyncThunk(
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

const getAllForums = createAsyncThunk(
	'forum/getAllForums',
	async (data: TForumListRequest, thunkAPI) => {
		try {
			const response = await forumdAPI.getAllForums(data);
			return response.data;
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

const createTopic = createAsyncThunk(
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

const getAllTopics = createAsyncThunk(
	'forum/getAllTopics',
	async (data: TCreateTopicRequest, thunkAPI) => {
		try {
			const response = await forumdAPI.getAllTopics(data);
			return response.data;
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

const createMessage = createAsyncThunk(
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

const getAllMessages = createAsyncThunk(
	'forum/getAllMessages',
	async (data: TMessageListRequest, thunkAPI) => {
		try {
			const response = await forumdAPI.getAllMessages(data);
			return response.data;
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

// eslint-disable-next-line max-len
export const forumThunks = {getAllForums, createForum, createTopic,getAllTopics, createMessage, getAllMessages};
