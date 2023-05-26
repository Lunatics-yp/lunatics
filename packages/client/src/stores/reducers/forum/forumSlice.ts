/* eslint-disable max-len */
import {CreateForumResponseObj} from 'client/src/api/typingForum';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {getNextId} from 'client/src/utils/getters';
import {TForumState} from './typing';
import {forumThunks} from './forumThunks';
import {isUserData} from 'client/src/api/request/utilits';

const initialState: TForumState = {
	messages: [
		{
			id: 1, isOwner: true,
			text: 'Хей! Привет, мы рады поприветствовать тебя на нашем форуме!!!',
			//	subtext: "Вот ответ",
		},
		{
			id: 2, isOwner: false,
			text: 'Как ты прошел этот непроходимый уровень?',
			//  replay: 1,
		},
		{
			id: 3, isOwner: false,
			text: ' Ответ на соообщение вышеdcscdsscd',
			parentid: 1,
			//  replay: 1,
		},
		{
			id: 4, isOwner: false,
			text: 'новый ответ',
			parentid: 1,
			//  replay: 1,
		},
	],
	topics: [
		{id: 1, title: 'Sky Wars', lastAuthorName: 'Obi Wan Kenobi', date: 'the 22th of December'},
		{id: 2, title: 'Благодарности', lastAuthorName: 'Евгений Малкин', date: 'вчера'},
		{id: 3, title: 'Война и мир', lastAuthorName: 'Лев Толстой', date: '1867 год'},
		{id: 4, title: 'Рецепт пиццы', lastAuthorName: 'Шеф', date: 'сегодня'},
	],
	forums: [
		{id: 1, title: 'Название Форума 1', topicsCount: 1, answersCount: 2},
		{id: 2, title: 'Название Форума 2', topicsCount: 58, answersCount: 77},
	],
	error: '',
	isLoading: false,
};

export const forumSlice = createSlice({
	name: 'forum',
	initialState,
	reducers: {
		//Форум
		addForum(state, {payload}: PayloadAction<string>) {
			state.forums.push({
				id: getNextId(state.forums),
				topicsCount: 0,
				answersCount: 0,
				title: payload,
			});
		},

		addTopic: (state, action: PayloadAction<string>) => {
			state.topics.push({
				id: getNextId(state.topics),
				title: action.payload,
				lastAuthorName: '',
				date: '',
			});
		},
		// Сообщения
		addMessage(state, {payload}: PayloadAction<string>) {
			state.messages.push({id: getNextId(state.messages), isOwner: true, text: payload});
		},

		//Ответ на сообщения
		addSubmassage(state, {payload}: PayloadAction<{parentid: number; content: string}>) {
			const {parentid, content} = payload;
			const messageId = getNextId(state.messages);
			state.messages.push({id: messageId, isOwner: true, text: content, parentid});
		},
	},

	extraReducers: (builder) => {
		builder
			//createForum
			.addCase(forumThunks.createForum.fulfilled, (state, action) => {
				state.isLoading = false;
				if (isUserData(action.payload)) {
					const forumData = action.payload as unknown as CreateForumResponseObj;
					state.forums.push({
						id: forumData.id,
						title: forumData.name,
						topicsCount: 0,
						answersCount: 0,
					});
				}
			})
			.addCase(forumThunks.createForum.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.createForum.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})
			// getAllForums
			.addCase(forumThunks.getAllForums.fulfilled, (state, action) => {
				state.isLoading = false;
				if (Array.isArray(action.payload)) {
					action.payload.forEach((forum) => {
						const existingForumIndex = state.forums.findIndex((f) => f.id === forum.id);
						if (existingForumIndex === -1) {
							state.forums.push({id: forum.id, title: forum.name, topicsCount: 0, answersCount: 0});
						} else {
							state.forums[existingForumIndex].title = forum.name;
						}
					});
				}
			})
			.addCase(forumThunks.getAllForums.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.getAllForums.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			});
		//createTopic
		// .addCase(forumThunks.createTopic.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(forumThunks.createTopic.fulfilled, (state,
		// 	//action
		// ) => {
		// 	state.isLoading = false;
		// 	state.error = '';
		// 	//		state.topics.push(action.payload);
		// })
		// .addCase(forumThunks.createTopic.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload as string;
		// });

	},

});

export const forumSelectors = {
	forums: (state: RootState) => state.forumReducer.forums,
	topics: (state: RootState) => state.forumReducer.topics,
	messages: (state: RootState) => state.forumReducer.messages,
	isLoading: (state: RootState) => state.forumReducer.isLoading,
	error: (state: RootState) => state.forumReducer.error,
	parentMessages: (state: RootState) => state.forumReducer.messages.filter(m => !m.parentid),
};
export const forumActions = forumSlice.actions;
export default forumSlice.reducer;
