import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {transformReaction} from 'client/src/api/apiTransformers';
import {isErrorAPI, isReactionData} from 'client/src/api/request/utilits';
import {RootState} from 'client/src/stores/store';
import {getNextId} from 'client/src/utils/getters';
import {reactionThunks} from './reactionsThunks';
import {TForumState} from './typing';

const initialState: TForumState = {
	messages: [
		{id: 1, isOwner: true,
			text: 'Хей! Привет, мы рады поприветствовать тебя на нашем форуме!!!',
			reactions: [],
			activeReaction: null,
		},
		{id: 2, isOwner: false,
			text: 'Как ты прошел этот непроходимый уровень?',
			reactions: [],
			activeReaction: null,
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
		// Сообщения
		addMessage(state, {payload}: PayloadAction<string>) {
			state.messages.push({
				id: getNextId(state.messages),
				isOwner: true,
				text: payload,
				reactions: [],
				activeReaction: null,
			});
		},
	},
	extraReducers: builder => {
		builder
			// Добавить / обновить реакцию
			.addCase(reactionThunks.setReaction.fulfilled, (state, action) => {
				if (isReactionData(action.payload)) {
					const payloadTransform = transformReaction(action.payload);
					const currentMessage = state.messages.find(
						message => message.id === payloadTransform.messageId,
					);
					if (currentMessage) {
						const currentReaction = currentMessage.reactions.find(
							reaction => reaction.reactionId === payloadTransform.reactionId,
						);
						// Добавить реакцию
						if (!currentMessage.activeReaction) {
							// Реакция с таким типом первая
							if (!currentReaction) {
								currentMessage.reactions.push({
									reactionId: payloadTransform.reactionId,
									count: 1,
								});
							} else {
								currentMessage.reactions.push({
									reactionId: payloadTransform.reactionId,
									count: currentReaction.count + 1,
								});
							}
							currentMessage.activeReaction = payloadTransform.reactionId;
						} else {
							// Обновить реакцию
							const reactionsWithoutCurrent = currentMessage.reactions.filter(
								reaction => reaction.reactionId !== payloadTransform.reactionId,
							);
							// Новая реакция с таким типом первая
							if (!currentReaction) {
								currentMessage.reactions.push({
									reactionId: payloadTransform.reactionId,
									count: 1,
								});
							} else {
								currentMessage.reactions.push({
									reactionId: payloadTransform.reactionId,
									count: currentReaction.count + 1,
								});
							}
							currentMessage.reactions = reactionsWithoutCurrent;
							currentMessage.activeReaction = payloadTransform.reactionId;
						}
					}
				}
			})
			// Удалить реакцию
			.addCase(reactionThunks.deleteReaction.fulfilled, (state, action) => {
				if (!isErrorAPI(action.payload) && action.payload.deleted) {
					const currentMessage = state.messages.find(
						message => message.id === action.meta.arg.message_id,
					);
					if (currentMessage) {
						const reactionsWithoutCurrent = currentMessage.reactions.filter(
							reaction => reaction.reactionId !== currentMessage.activeReaction,
						);
						currentMessage.reactions = reactionsWithoutCurrent;
						currentMessage.activeReaction = null;
					}
				}
			})
		;
	},
});

export const forumSelectors = {
	forums: (state: RootState) => state.forumReducer.forums,
	discussions: (state: RootState) => state.forumReducer.discussions,
	messages: (state: RootState) => state.forumReducer.messages,
};
export const forumActions = forumSlice.actions;
export default forumSlice.reducer;
