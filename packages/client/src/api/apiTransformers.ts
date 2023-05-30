import {TUser} from 'client/src/stores/reducers/auth/typing';
import {TUserDTO} from './typingAPI';

export const transformUser = (data: TUserDTO): TUser => ({
	id: data.id,
	login: data.login,
	firstName: data.first_name,
	secondName: data.second_name,
	displayName:  data.display_name || '',
	avatar: data.avatar,
	phone: data.phone,
	email: data.email,
});

// export const transformForum = (data: TForumDTO): TForumUser => ({
// 	id: data.id,
// 	name: data.name,
// 	user_id: data.user_id,
// 	created_at:  data.created_at ,
// });

// export const transformTopic= (data: TTopicDTO): TTopicUser => ({
// 	id: data.id,
// 	name: data.name,
// 	forum_id: data.forum_id,
// 	user_id: data.user_id,
// 	created_at:  data.created_at ,
// });

// export const transformTMessage = (data: TMessageDTO): TMessageUser => ({
// 	id: data.id,
// 	user_id: data.user_id,
// 	text: data.text,
// 	topic_id: data.topic_id,
// 	parent_message_id: data.parent_message_id,
// 	created_at:  data.created_at ,
// });
