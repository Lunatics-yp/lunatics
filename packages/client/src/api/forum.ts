import {api1} from './baseService';
import {
	ForumForm, AllForums, AllTopics, AllMessages,
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

};
