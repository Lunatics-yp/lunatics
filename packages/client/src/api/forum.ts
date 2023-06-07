import {localApi} from './request/localApi';
import {
	TCreateForumRequest, TCreateForumResponse, TForumListRequest,
	TForumListResponse, TCreateTopicRequest, TCreateTopicResponse,
	TTopicListRequest, TTopicListResponse, TCreateMessageRequest,
	TCreateMessageResponse, TMessageListRequest, TMessageListResponse,
} from './typingForum';
import {FORUM_URL} from './constants';

export const forumdAPI = {

	createForum: (data: TCreateForumRequest) => (
		localApi.post<TCreateForumResponse>(FORUM_URL, data)
	),

	getAllForums: (data: TForumListRequest) => (
		localApi.post<TForumListResponse>(FORUM_URL, data)
	),

	createTopic: (data: TCreateTopicRequest) => (
		localApi.post<TCreateTopicResponse>(FORUM_URL, data)
	),

	getAllTopics: (data: TTopicListRequest) => (
		localApi.post<TTopicListResponse>(FORUM_URL, data)
	),

	createMessage: (data: TCreateMessageRequest) => (
		localApi.post<TCreateMessageResponse>(FORUM_URL, data)
	),

	getAllMessages: (data: TMessageListRequest) => (
		localApi.post<TMessageListResponse>(FORUM_URL, data)
	),
};
