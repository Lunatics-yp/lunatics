export type TUser = {
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
	user?: TUser; // Данные о юзере
};
