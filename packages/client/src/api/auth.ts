import {api} from './request';
import {TErrorAPI, TUserDTO} from './types';

type TNullObject = Record<string, never>;

export type TLoginRequestData = {
  login: string;
  password: string;
};

type TLoginResponseData = TNullObject | TErrorAPI;

export type TRegisterRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type TRegisterResponseData = {id: number} | TErrorAPI;

type TUserResponseData = TUserDTO | TErrorAPI;

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
