import {apiForum} from './request';
import {
	TCreateForumRequest, TCreateForumResponse, TForumListRequest,
	TForumListResponse, TCreateTopicRequest, TCreateTopicResponse,
	TTopicListRequest, TTopicListResponse, TCreateMessageRequest,
	TCreateMessageResponse, TMessageListRequest, TMessageListResponse,
} from './typingForum';
import {FORUM_URL} from './constants';

export const forumdAPI = {

	createForum: (data: TCreateForumRequest) => (
		apiForum.post<TCreateForumResponse>(FORUM_URL, data)
	),

	getAllForums: (data: TForumListRequest) => (
		apiForum.post<TForumListResponse>(FORUM_URL, data)
	),

	createTopic: (data: TCreateTopicRequest) => (
		apiForum.post<TCreateTopicResponse>(FORUM_URL, data)
	),

	getAllTopics: (data: TTopicListRequest) => (
		apiForum.post<TTopicListResponse>(FORUM_URL, data)
	),

	createMessage: (data: TCreateMessageRequest) => (
		apiForum.post<TCreateMessageResponse>(FORUM_URL, data)
	),

	getAllMessages: (data: TMessageListRequest) => (
		apiForum.post<TMessageListResponse>(FORUM_URL, data)
	),

};
