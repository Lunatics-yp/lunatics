import {TUser} from 'client/src/stores/reducers/auth/typing';
import {TReactionDTO, TUserDTO} from './typingAPI';
import {TReaction} from 'client/src/stores/reducers/forum/typing';

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

export const transformReaction = ({data}: TReactionDTO): TReaction => ({
	id: data.id,
	messageId: data.message_id,
	userId: data.user_id,
	reactionId: data.reaction_id,
});
