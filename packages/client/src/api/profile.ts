import {session} from './session';

type changePassword = {
	oldPassword: 'string';
	newPassword: 'string';
};

type changeUserForm = {

	login: 'string';
	email: 'string';
};

export default {
	getUserInfoByIdById(id: string) {
		return session.get(`/user/${id}`);
	},

	getUserInfo() {
		return session.get('/auth/user');
	},

	changePassword(usersPasswords: changePassword) {
		return session.put('/user/password', {changePasswordRequest: usersPasswords});
	},

	changeAvatarData(form: FormData): Promise<string> {
		return session.put('/user/profile/avatar', form,
			{headers: {'Content-Type': 'multipart/form-data'}});
	},
	changeUserForm(userForm: changeUserForm) {
		return session.put('user/profile', {changeUserFormRequest: userForm});
	}
};
