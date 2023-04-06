import {api} from './request';
import {
	TLoginRequestData,
	TLoginResponseData,
	TNullObject,
	TRegisterRequestData,
	TRegisterResponseData,
	TUserResponseData
} from './typing';

export const authAPI = {
	register: (data: TRegisterRequestData) => (
		// eslint-disable-next-line max-len
		api.post<TRegisterResponseData, TRegisterResponseData, TRegisterRequestData>('auth/signup', data)
	),
	login: (data: TLoginRequestData) => (
		api.post<TLoginResponseData, TLoginResponseData, TLoginRequestData>('auth/signin', data)
	),
	getUser: () => (
		api.get<TUserResponseData, TUserResponseData>('auth/user')
	),
	logout: () => (
		api.post<TNullObject, TNullObject>('auth/logout')
	)
};
