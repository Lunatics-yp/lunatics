export type TUserData = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	avatar: string;
	email: string;
	phone: string;
	theme: number;
};

// Тип данных ответа от проверки авторизации
export type TCheckAuth = {
	isAuth: boolean; // Авторизован ли
	user?: TUserData; // Данные о юзере
};
