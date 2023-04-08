import {TErrorAPI, TUserDTO} from './typingAPI';

export type TNullObject = Record<string, never>;

export type TLoginRequestData = {
	login: string;
	password: string;
};

export type TLoginResponseData = TNullObject | TErrorAPI;

export type TRegisterRequestData = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

export type TRegisterResponseData = {id: number} | TErrorAPI;

export type TUserResponseData = TUserDTO | TErrorAPI;

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TChangeUserForm = {
  login: string;
  email: string;
};
