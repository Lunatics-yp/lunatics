/* eslint-disable no-mixed-spaces-and-tabs */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {getNextId} from 'client/src/utils/getters';
import {TForumState} from './typing';
import {forumThunks} from './forumThunks';

// eslint-disable-next-line max-len
import {TCreateForumResponseObj, TCreateTopicResponseObj} from 'client/src/api/typingForum';

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
		addForum(state, {payload}: PayloadAction<string>) {
			state.forums.push({
				id: state.forums.length >= 1 ? getNextId(state.forums) : 1,
				name: payload,
				user_id: state.forums.length >= 1 ? getNextId(state.forums) : 1,
				created_at: 0,
			});
		  },

		addTopic: (state, action: PayloadAction<string>) => {
			state.topics.push({
				id: state.topics.length >= 1 ? getNextId(state.topics) : 1,
				name: action.payload,
				time: '',
				forum_id: 0,
				user_id: 0,
				created_at: 0,
			});
		},
		// Сообщения
		addMessage(state, {payload}: PayloadAction<string>) {
			state.messages.push({
				// eslint-disable-next-line max-len
				id: state.messages.length >= 1 ? getNextId(state.messages) : 1, isOwner: true, text: payload,
				user_id: 0,
				topic_id: 0,
				parent_message_id: 0,
				created_at: 0,
				user: undefined,
				reactions: [],
			});
		},

		// Ответ на сообщения
		// eslint-disable-next-line max-len
		addSubmessage(state, {payload}: PayloadAction<{parent_message_id: number; content: string}>) {
			const {parent_message_id, content} = payload;
			const messageId = getNextId(state.messages);
			state.messages.push({
				id: messageId,
				isOwner: true,
				text: content,
				parent_message_id,
				user_id: 0,
				topic_id: 0,
				created_at: 0,
				reactions: [],
				user_reaction: 0,
			});
		},
	},

	extraReducers: (builder) => {
		builder
			// CreateForum
			.addCase(forumThunks.createForum.fulfilled, (state, action) => {
				state.isLoading = false;
				const forumData = action.payload.data as unknown as TCreateForumResponseObj;
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
			const topicData = action.payload.data as unknown as TCreateTopicResponseObj;
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

		// // CreateMessage
		// .addCase(forumThunks.createMessage.fulfilled, (state, action) => {
		// 	const messageData = action.payload.data as unknown as TMessages;
		// 	state.messages = [messageData, ...state. messages];
		// })
		// .addCase(forumThunks.createMessage.pending, (state) => {
		// 	state.isLoading = true;
		// 	state.error = '';
		// })
		// .addCase(forumThunks.createMessage.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.error.message ?? 'Возникла неизвестная ошибка';
		// })

			// GetAllMessages
			.addCase(forumThunks.createMessage.rejected,(state, action: PayloadAction<any>) => {
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
	// eslint-disable-next-line max-len
	parentMessages: (state: RootState) => state.forumReducer.messages.filter(m => !m.parent_message_id),
};
export const forumActions = forumSlice.actions;
export default forumSlice.reducer;
