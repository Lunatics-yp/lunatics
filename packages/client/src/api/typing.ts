import {TErrorAPI, TUserDTO} from './typingAPI';

export type TNullObject = Record<string, never>;

/* Login */

export type TLoginRequestData = {
	login: string;
	password: string;
};

export type TLoginResponseData = TNullObject | TErrorAPI;

/* Register */

export type TRegisterRequestData = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

export type TRegisterResponseData = {id: number} | TErrorAPI;

/* User */

export type TUserResponseData = TUserDTO;

export type TChangePasswordRequestData = {
	oldPassword: string;
	newPassword: string;
};

export type TChangeUserRequestData = {
	login: string;
	email: string;
	first_name: string;
	second_name: string;
	phone: string;
	display_name: string;
};
