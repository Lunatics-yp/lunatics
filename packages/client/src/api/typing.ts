import {TErrorAPI, TReactionsDTO, TUserDTO} from './typingAPI';
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

export type TOAuthYandexResponseData = undefined | TErrorAPI;

export type TOAuthYandexRequestData = {
	code: string;
};

export type TServiceIdResponseData = TServiceId | TErrorAPI;

export type TServiceIdRequestData = TRedirectUri;

export type TRedirectUri = string;

export type TServiceId = {
	service_id: string;
};

/* Reactions */

export type TSetReactionResponseData = TReactionsDTO | TErrorAPI;

export enum REACTIONS_ACTION {
	SET = 'reaction.set',
	DELETE = 'reaction.delete',
}

export type  TSetReactionRequestData = {
	message_id: number;
	reaction_id: number;
};

export type TDeleteReactionResponseData = {deleted: boolean};

export type TDeleteReactionRequestData = {
	message_id: number;
};
