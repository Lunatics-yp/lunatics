import {apiForum} from './request';
/* eslint-disable-next-line max-len */
import {createForumRequest, CreateForumResponse, ForumListRequest, ForumListResponse, createTopicRequest, CreateTopicResponse} from './typingForum';
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

	// getAllForums: (data: type) => (

	// )

	// 	_allForums: (data: ForumForm) => (
	// 		api1.post<Array<AllForums>>('/api/forum/forum...', data)
	// 	),
	// 	get allForums() {
	// 		return this._allForums;
	// 	},
	// 	set allForums(value) {
	// 		this._allForums = value;
	// 	},

	// 	getAllTopics: (data: getAllTopicsRequest) => (
	// 		api1.post<Array<AllTopics>>(FORUM_URL, data)
	// 	),

	// 	getAllMessages: (data: ForumForm) => (
	// 		api1.post<Array<AllMessages>>(FORUM_URL, data)
	// 	),
	// 	//___________________________________________________________________

	// 	// getYandexServiceId(redirect_uri) => (
	// 	// api1.get("/oauth/yandex/service-id",)),

	// getForumById: (data: ForumForm) => (
	// 	api1.post<Array<AllForums>>(FORUM_URL, data)
	// ),

	// 	getTopicById: (data: ForumForm) => (
	// 		api1.post<Array<AllTopics>>(FORUM_URL, data)
	// 	),

	// 	getMessageById: (data: ForumForm) => (
	// 		api1.post<Array<AllMessages>>(FORUM_URL, data)
	// 	),

	// 	createTopic: (data: ForumForm) => (
	// 		api1.post<Array<NewForum>>(FORUM_URL, data)
	// 	),

	// 	createMessage: (data: ForumForm) => (
	// 		api1.post<Array<NewMessage>>(FORUM_URL, data)
	// 	),

};
