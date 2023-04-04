import {session} from './session';

type TChangePassword = {
	oldPassword: string;
	newPassword: string;
};

type TChangeUserForm = {
	login: string;
	email: string;
};

export const ProfileApi = {
	getUserInfoByIdById(id: string) {
		return session.get(`/user/${id}`);
	},

	getUserInfo() {
		return session.get('/auth/user');
	},

	changePassword(usersPasswords: TChangePassword) {
		return session.put('/user/password', {changePasswordRequest: usersPasswords});
	},

	changeAvatarData(form: FormData): Promise<string> {
		return session.put('/user/profile/avatar', form,
			{headers: {'Content-Type': 'multipart/form-data'}});
	},
	changeUserForm(userForm: TChangeUserForm) {
		return session.put('user/profile', {changeUserFormRequest: userForm});
	}
};
