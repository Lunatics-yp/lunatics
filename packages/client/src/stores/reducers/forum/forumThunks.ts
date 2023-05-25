// import {createAsyncThunk} from '@reduxjs/toolkit';
// import {forumdAPI} from 'client/src/api/forum';
// import {
// 	ForumForm,
// } from 'client/src/api/typing';

// // Для взаимодействия с асинхронными actions используем createAsyncThunk.
// // export const getForumById = createAsyncThunk(
// // 	'forum/getForumById',
// // 	async (data: ForumForm, thunkAPI) => {
// // 		try {
// // 			return await forumdAPI.getForumById(data);
// // 		}
// // 		catch (e) {
// // 			return thunkAPI.rejectWithValue(e);
// // 		}
// // 	},
// // );

// // export const createForum = createAsyncThunk(
// // 	'forum/createForum',
// // 	async (data: ForumForm, thunkAPI) => {
// // 		try {
// // 			return await forumdAPI.createForum(data);
// // 		} catch (e) {
// // 			throw thunkAPI.rejectWithValue(e);
// // 		}
// // 	},
// // );

// // export const getTopicById = createAsyncThunk(
// // 	'forum/getTopicById',
// // 	async (data: ForumForm, thunkAPI) => {
// // 		try {
// // 			return await forumdAPI.getTopicById(data);
// // 		} catch (e) {
// // 			throw thunkAPI.rejectWithValue(e);
// // 		}
// // 	},
// // );

// // export const createTopic = createAsyncThunk(
// // 	'forum/createTopic',
// // 	async (data: ForumForm, thunkAPI) => {
// // 		try {
// // 			return await forumdAPI.createTopic(data);
// // 		} catch (e) {
// // 			throw thunkAPI.rejectWithValue(e);
// // 		}
// // 	},
// // );

// // export const createMessage = createAsyncThunk(
// // 	'forum/createMessage',
// // 	async (data: ForumForm, thunkAPI) => {
// // 		try {
// // 			return await forumdAPI.createMessage(data);
// // 		} catch (e) {
// // 			throw thunkAPI.rejectWithValue(e);
// // 		}
// // 	},
// // );

// export const forumThunks = {getForumById, createForum, getTopicById, createTopic, createMessage};
