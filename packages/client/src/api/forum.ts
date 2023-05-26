import {apiForum} from './request';
/* eslint-disable-next-line max-len */
import {
	createForumRequest, CreateForumResponse, ForumListRequest,
	ForumListResponse, createTopicRequest, CreateTopicResponse,
	TopicListRequest, TopicListResponse, createMessageRequest,
	CreateMessageResponse, MessageListRequest, MessageListResponse,
} from './typingForum';
import {FORUM_URL} from './constants';

export const forumdAPI = {

	createForum: (data: createForumRequest) => (
		apiForum.post<CreateForumResponse>(FORUM_URL, data)
	),

	getAllForums: (data: ForumListRequest) => (
		apiForum.post<ForumListResponse>(FORUM_URL, data)
	),

	createTopic: (data: createTopicRequest) => (
		apiForum.post<CreateTopicResponse>(FORUM_URL, data)
	),

	getAllTopics: (data: TopicListRequest) => (
		apiForum.post<TopicListResponse>(FORUM_URL, data)
	),

	createMessage: (data: createMessageRequest) => (
		apiForum.post<CreateMessageResponse>(FORUM_URL, data)
	),

	getAllMessages: (data: MessageListRequest) => (
		apiForum.post<MessageListResponse>(FORUM_URL, data)
	),

};
