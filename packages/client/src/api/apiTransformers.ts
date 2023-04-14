import {TUser} from 'client/src/stores/reducers/auth/typing';
import {TUserDTO} from './typingAPI';

export const transformUser = (data: TUserDTO): TUser => ({
	id: data.id,
	login: data.login,
	firstName: data.first_name,
	secondName: data.second_name,
	displayName:  data.display_name || '',
	avatar: data.avatar || '',
	phone: data.phone,
	email: data.email,
});
