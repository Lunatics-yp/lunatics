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

export type TUserResponseData = TUserDTO | TErrorAPI;

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

export type TLeaderboard = {
	ratingFieldName: string;
	cursor: number;
	limit: number;
};

export type TLeaderboardData = {
	id?: number;
	name: string;
};

export type TAddLeaderboard = {
	ratingFieldName: string;
	data: TLeaderboardData;
	teamName: string;
};

export type TLeaderboardResponse = {
	data: TLeaderboardData;
};
