import {api1} from './baseService';
import {
	ForumForm, AllForums, AllTopics, AllMessages, NewTopic, NewMessage, NewForum,
} from './typing';

export const forumdAPI = {

	allForums: (data: ForumForm) => (
		api1.post<Array<AllForums>>('/api/forum/forum...', data)
	),

	allForumTopics: (data: ForumForm) => (
		api1.post<Array<AllTopics>>('/api/forum/topic...', data)
	),

	allMessages: (data: ForumForm) => (
		api1.post<Array<AllMessages>>('/api/forum/message...', data)
	),
	//___________________________________________________________________

	// getYandexServiceId(redirect_uri) => (

	// api1.get("/oauth/yandex/service-id",)),

	getForumById: (data: ForumForm) => (
		api1.post<Array<AllForums>>('/api/forum//forum..', data)
	),

	getTopicById: (data: ForumForm) => (
		api1.post<Array<AllTopics>>('/api/forum//topic..', data)
	),

	getMessageById: (data: ForumForm) => (
		api1.post<Array<AllMessages>>('/api/forum//message..', data)
	),
	//  getTopicById: (data: ForumForm) => (
	//    api1.get(`/topic/${body}`)),
	createTopic: (data: ForumForm) => (
		api1.post<Array<NewForum>>('/api/forum//topic', data)
	),

	createForum: (data: ForumForm) => (
		api1.post<Array<NewTopic>>('/api/forum//topic', data)
	),

	createMessage: (data: ForumForm) => (
		api1.post<Array<NewMessage>>('/api/forum//topic', data)
	),

	//  likeMessage(id: number, userId: string) {
	//    api1.post(`/message/like/${id}`, { userId: userId });
	// },
	//  dislikeMessage(id: number, userId: string) {
	//    api1.post(`/message/dislike/${id}`, { userId: userId });
	// },

};
