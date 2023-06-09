import {TErrorAPI, TReactionDTO, TThemeDTO, TUserDTO} from './typingAPI';
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

/* Leaderboard */

export type TLeaderboard = {
	offset: number;
	limit: number;
};

export type TLeaderboardResponse = {
	id: number;
	games: number;
	wins: number;
	User: {
		avatar: string | null;
		display_name: string;
		id: number;
		login: string;
	};
};

/* OAuth */

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

/* Themes */

export enum THEMES_ACTION {
	CHANGE = 'theme.change',
}

export type  TThemeRequestData = {
	themeName: string;
};
export type TThemeResponseData = TThemeDTO | TErrorAPI;

/* Reactions */

export type TSetReactionResponseData = TReactionDTO | TErrorAPI;

export enum REACTIONS_ACTION {
	SET = 'reaction.set',
	DELETE = 'reaction.delete',
}

export type  TSetReactionRequestData = {
	message_id: number;
	reaction_id: number;
};

export type TDeleteReactionResponseData = {data: {deleted: boolean}} | TErrorAPI;

export type TDeleteReactionRequestData = {
	message_id: number;
};
