import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {getNextId} from 'client/src/utils/getters';
import {TForumState} from './typing';

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
	discussions: [
		{id: 1, title: 'Sky Wars', lastAuthorName: 'Obi Wan Kenobi', date: 'the 22th of December'},
		{id: 2, title: 'Благодарности', lastAuthorName: 'Евгений Малкин', date: 'вчера'},
		{id: 3, title: 'Война и мир', lastAuthorName: 'Лев Толстой', date: '1867 год'},
		{id: 4, title: 'Рецепт пиццы', lastAuthorName: 'Шеф', date: 'сегодня'},
	],
	forums: [
		{id: 1, title: 'Название Форума 1', discussionsCount: 1, answersCount: 2},
		{id: 2, title: 'Название Форума 2', discussionsCount: 58, answersCount: 77},
	],
	error: '',
	isLoading: false,
};

export const forumSlice = createSlice({
	name: 'forum',
	initialState,
	reducers: {
		// Форум
		addForum(state, {payload}: PayloadAction<string>) {
			state.forums.push({
				id: getNextId(state.forums),
				discussionsCount: 0,
				answersCount: 0,
				title: payload,
			});
		},

		addTopic(state, {payload}: PayloadAction<string>) {
			state.forums.push({
				id: getNextId(state.forums),
				discussionsCount: 0,
				answersCount: 0,
				title: payload,
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

});
export const forumSelectors = {
	forums: (state: RootState) => state.forumReducer.forums,
	discussions: (state: RootState) => state.forumReducer.discussions,
	messages: (state: RootState) => state.forumReducer.messages,
	isLoading: (state: RootState) => state.forumReducer.isLoading,
	error: (state: RootState) => state.forumReducer.error,
	parentMessages: (state: RootState) => state.forumReducer.messages.filter(m => !m.parentid),
};
export const forumActions = forumSlice.actions;
export default forumSlice.reducer;
