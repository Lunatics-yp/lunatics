import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {getNextId} from 'client/src/utils/getters';
import {TForumState} from './typing';
import {forumThunks} from './forumThunks';
import {isUserData} from 'client/src/api/request/utilits';
import {
	TCreateMessageResponseObj, TCreateTopicResponseObj,
	TCreateForumResponseObj,
} from 'client/src/api/typingForum';
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
		//Форум
		addForum(state, {payload}: PayloadAction<string>) {
			state.forums.push({
				id: state.forums.length >= 1 ? getNextId(state.forums) : 1,
				topicsCount: 0,
				answersCount: 0,
				title: payload,
			});
		},

		addTopic: (state, action: PayloadAction<string>) => {
			state.topics.push({
				id: state.topics.length >= 1 ? getNextId(state.topics) : 1,
				title: action.payload,
				lastAuthorName: '',
				date: '',
			});
		},
		// Сообщения
		addMessage(state, {payload}: PayloadAction<string>) {
			state.messages.push({
				id: state.messages.length >= 1 ?
					getNextId(state.messages) : 1, isOwner: true, text: payload,
			});
		},

		//Ответ на сообщения
		addSubmessage(state, {payload}: PayloadAction<{parentd: number; content: string}>) {
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
					const forumData = action.payload as unknown as TCreateForumResponseObj;
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
							state.forums.push({
								id: forum.id, title: forum.name,
								topicsCount: 0, answersCount: 0,
							});
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

		// createTopic
		builder.addCase(forumThunks.createTopic.fulfilled, (state, action) => {
			state.isLoading = false;
			if (isUserData(action.payload)) {
				const topicData = action.payload as unknown as TCreateTopicResponseObj;
				state.topics.push({
					id: topicData.id,
					title: topicData.name,
					lastAuthorName: '',
					date: '',
				});
			}
		});

		builder.addCase(forumThunks.createTopic.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});

		builder.addCase(forumThunks.createTopic.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message ?? 'Возникла неизвестная ошибка';
		})

			// getAllTopics
			.addCase(forumThunks.getAllTopics.fulfilled, (state, action) => {
				state.isLoading = false;
				if (Array.isArray(action.payload)) {
					action.payload.forEach((topic) => {
						const existingTopicIndex = state.topics.findIndex((t) => t.id === topic.id);
						if (existingTopicIndex === -1) {
							state.topics.push({
								id: topic.id,
								title: topic.name,
								lastAuthorName: '',
								date: '',
							});
						} else {
							state.topics[existingTopicIndex].title = topic.name;
						}
					});
				}
			})
			.addCase(forumThunks.getAllTopics.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.getAllTopics.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})

			// createMessage
			.addCase(forumThunks.createMessage.fulfilled, (state, action) => {
				state.isLoading = false;
				if (isUserData(action.payload)) {
					const messageData = action.payload as unknown as TCreateMessageResponseObj;
					state.messages.push({
						id: messageData.id,
						isOwner: true,
						text: messageData.text,
					});
				}
			})
			.addCase(forumThunks.createMessage.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(forumThunks.createMessage.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'Возникла неизвестная ошибка';
			})

			// getAllMessages
			.addCase(forumThunks.getAllMessages.fulfilled, (state, action) => {
				state.isLoading = false;
				if (Array.isArray(action.payload)) {
					action.payload.forEach((message) => {
						const existingMessageIndex = state.messages.findIndex(
							(m) => m.id === message.id);
						if (existingMessageIndex === -1) {
							state.messages.push({
								id: message.id,
								isOwner: message.isOwner,
								text: message.text,
								parentid: message.parentid,
							});
						} else {
							state.messages[existingMessageIndex].text = message.text;
						}
					});
				}
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
	parentMessages: (state: RootState) => state.forumReducer.messages.filter(m => !m.parentid),
};
export const forumActions = forumSlice.actions;
export default forumSlice.reducer;
