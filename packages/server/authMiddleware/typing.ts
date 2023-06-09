import type {Request} from 'express';

export type TUserData = {
	theme: object ;
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	avatar: string;
	email: string;
	phone: string;
};

// Тип данных ответа от проверки авторизации
export type TCheckAuth = {
	isAuth: boolean; // Авторизован ли
	user?: TUserData; // Данные о юзере
};

// Тип данные запроса после прохождения проверки авторизации (для использования в апи)
export type TRequestWithUserData = {
	authUserData?: TUserData;
} & Request;
