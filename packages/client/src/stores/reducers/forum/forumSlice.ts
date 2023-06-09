import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {transformReaction} from 'client/src/api/apiTransformers';
import {isErrorAPI, isReactionData} from 'client/src/api/request/utilits';
import {TForumState} from './typing';
import {forumThunks} from './forumThunks';
import {reactionThunks} from './reactionsThunks';
import {TCreateForumResponseData, TCreateTopicResponseData, TCreateMessageResponseData} from
	'client/src/api/typingForum';

const initialState: TForumState = {
	messages: [],
	topics: [],
	forums: [],
	error: '',
	isLoading: false,
};

export const forumSlice = createSlice({
	name: 'forum',
	initialState,
	reducers: {
		// Форум
		
		// Сообщения
		// addMessage(state, {payload}: PayloadAction<string>) {

		// Ответ на сообщения
		
	},

	extraReducers: (builder) => {
		builder
			// CreateForum
			.addCase(forumThunks.createForum.fulfilled, (state, action) => {
				state.isLoading = false;
				const forumData = action.payload.data as unknown as TCreateForumResponseData;
				state.forums = [forumData, ...state.forums];
			})
			.addCase(forumThunks.createForum.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.createForum.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})

			// GetAllForums
			// eslint-disable-next-line max-len
			.addCase(forumThunks.getAllForums.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.forums = action.payload;
			})
			.addCase(forumThunks.getAllForums.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.getAllForums.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			});

		// CreateTopic
		builder.addCase(forumThunks.createTopic.fulfilled, (state, action) => {
			state.isLoading = false;
			const topicData = action.payload.data as unknown as TCreateTopicResponseData;
			state.topics = [topicData, ...state.topics];
		});

		builder.addCase(forumThunks.createTopic.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});

		builder.addCase(forumThunks.createTopic.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message ?? 'Возникла неизвестная ошибка';
		})

			// GetAllTopics
			.addCase(forumThunks.getAllTopics.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.topics = action.payload;
			})
			.addCase(forumThunks.getAllTopics.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.getAllTopics.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})

		// CreateMessage
			.addCase(forumThunks.createMessage.fulfilled, (state, action) => {
				const messageData = action.payload.data as unknown as TCreateMessageResponseData;
				console.log('messageData', messageData);
				state.messages = [messageData, ...state.messages];
			})
			.addCase(forumThunks.createMessage.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.createMessage.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})

			// GetAllMessages
			.addCase(forumThunks.getAllMessages.fulfilled,(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.messages = action.payload;
			})
			.addCase(forumThunks.getAllMessages.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.getAllMessages.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})
			// Добавить / обновить реакцию
			.addCase(reactionThunks.setReaction.fulfilled, (state, action) => {
				if (isReactionData(action.payload)) {
					const payloadTransform = transformReaction(action.payload);
					const currentMessage = state.messages.find(
						message => message.id === payloadTransform.messageId,
					);
					if (currentMessage && currentMessage.reactions) {
						const currentReaction = currentMessage.reactions.find(
							reaction => reaction.reaction_id === payloadTransform.reactionId,
						);
						// Добавить реакцию
						if (!currentMessage.user_reaction) {
						// Реакция с таким типом первая
							if (!currentReaction) {
								currentMessage.reactions.push({
									reaction_id: payloadTransform.reactionId,
									count: 1,
								});
							} else {
								currentMessage.reactions.push({
									reaction_id: payloadTransform.reactionId,
									count: currentReaction.count + 1,
								});
							}
							currentMessage.user_reaction = payloadTransform.reactionId;
						} else {
						// Обновить реакцию
							const reactionsWithoutCurrent = currentMessage.reactions.filter(
								reaction => reaction.reaction_id !== payloadTransform.reactionId,
							);
							// Новая реакция с таким типом первая
							if (!currentReaction) {
								currentMessage.reactions.push({
									reaction_id: payloadTransform.reactionId,
									count: 1,
								});
							} else {
								currentMessage.reactions.push({
									reaction_id: payloadTransform.reactionId,
									count: currentReaction.count + 1,
								});
							}
							currentMessage.reactions = reactionsWithoutCurrent;
							currentMessage.user_reaction = payloadTransform.reactionId;
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
					if (currentMessage && currentMessage.reactions) {
						const reactionsWithoutCurrent = currentMessage.reactions.filter(
							reaction => reaction.reaction_id !== currentMessage.user_reaction,
						);
						currentMessage.reactions = reactionsWithoutCurrent;
						currentMessage.user_reaction = null;
					}
				}
			});
	},
},
);

export const forumSelectors = {
	forums: (state: RootState) => state.forumReducer.forums,
	topics: (state: RootState) => state.forumReducer.topics,
	messages: (state: RootState) => state.forumReducer.messages,
	isLoading: (state: RootState) => state.forumReducer.isLoading,
	error: (state: RootState) => state.forumReducer.error,
	parentMessages: (state: RootState) => state.forumReducer.messages.filter(m =>
		!m.parent_message_id),
};
export const forumActions = forumSlice.actions;
export default forumSlice.reducer;
