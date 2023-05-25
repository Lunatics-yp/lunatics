import {api1} from './request';
import {
	ForumForm, AllForums, AllTopics, AllMessages, NewTopic, NewMessage, NewForum,
} from './typing';
import {Forum} from '../pages/Forum';
export const forumdAPI = {

	// _allForums: (data: ForumForm) => (
	// 	api1.post<Array<AllForums>>('/api/forum/forum...', data)
	// ),
	// get allForums() {
	// 	return this._allForums;
	// },
	// set allForums(value) {
	// 	this._allForums = value;
	// },

	// allForumTopics: (data: ForumForm) => (
	// 	api1.post<Array<AllTopics>>(Forum, data)
	// ),

	// allMessages: (data: ForumForm) => (
	// 	api1.post<Array<AllMessages>>(Forum, data)
	// ),
	// //___________________________________________________________________

	// // getYandexServiceId(redirect_uri) => (

	// // api1.get("/oauth/yandex/service-id",)),

	// getForumById: (data: ForumForm) => (
	// 	api1.post<Array<AllForums>>(Forum, data)
	// ),

	// getTopicById: (data: ForumForm) => (
	// 	api1.post<Array<AllTopics>>(Forum, data)
	// ),

	// getMessageById: (data: ForumForm) => (
	// 	api1.post<Array<AllMessages>>(Forum, data)
	// ),
	// //  getTopicById: (data: ForumForm) => (
	// //    api1.get(`/topic/${body}`)),
	// createTopic: (data: ForumForm) => (
	// 	api1.post<Array<NewForum>>(Forum, data)
	// ),

	// createForum: (data: ForumForm) => (
	// 	api1.post<Array<NewTopic>>(Forum, data)
	// ),

	// createMessage: (data: ForumForm) => (
	// 	api1.post<Array<NewMessage>>(Forum, data)
	// ),

	//  likeMessage(id: number, userId: string) {
	//    api1.post(`/message/like/${id}`, { userId: userId });
	// },
	//  dislikeMessage(id: number, userId: string) {
	//    api1.post(`/message/dislike/${id}`, { userId: userId });
	// },

};
