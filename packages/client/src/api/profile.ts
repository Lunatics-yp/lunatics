import {axios} from './axios';
import {TChangePassword, TChangeUserForm} from './typing';

export const ProfileApi = {
	getUserInfoByIdById(id: string) {
		return axios.get(`/user/${id}`);
	},

	getUserInfo() {
		return axios.get('/auth/user');
	},

	changePassword(usersPasswords: TChangePassword) {
		return axios.put('/user/password', {changePasswordRequest: usersPasswords});
	},

	changeAvatarData(form: FormData): Promise<string> {
		return axios.put('/user/profile/avatar', form,
			{headers: {'Content-Type': 'multipart/form-data'}});
	},
	changeUserForm(userForm: TChangeUserForm) {
		return axios.put('user/profile', {changeUserFormRequest: userForm});
	}
};
