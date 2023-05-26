import {TUser} from 'client/src/stores/reducers/auth/typing';
import {REACTIONS} from 'client/src/config/constants';
import {TReactionsDTO, TUserDTO} from './typingAPI';

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

type TReaction = {
	messageId: number;
	userId: number;
	reactionId: REACTIONS;
};

export const transformReaction = (data: TReactionsDTO): TReaction => ({
	messageId: data.data.message_id,
	userId: data.data.user_id,
	reactionId: data.data.reaction_id,
});
