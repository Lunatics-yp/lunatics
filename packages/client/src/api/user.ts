import {api} from './request';
import {
	TUserResponseData,
	TChangeUserRequestData,
	TChangePasswordRequestData,
} from './typing';

export const userAPI = {
	getUserById: (id: number) => (
		api.get<TUserResponseData, TUserResponseData>(`user/${id}`)
	),
	changePassword: (data: TChangePasswordRequestData) => (
		api.put<TUserResponseData, TUserResponseData,
			TChangePasswordRequestData>('user/password', data)
	),
	changeAvatar: (data: FormData) => (
		api.put<TUserResponseData, TUserResponseData, FormData>(
			'user/profile/avatar',
			data,
			{
				headers: {'Content-Type': 'multipart/form-data'},
			})
	),
	changeUser: (data: TChangeUserRequestData) => (
		api.put<TUserResponseData, TUserResponseData,
			TChangeUserRequestData>('user/profile', data)
	),
};
