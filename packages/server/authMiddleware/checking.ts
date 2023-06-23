import axios from 'axios';
import type {NextFunction, Request, Response} from 'express';
import {filterCookies} from './utils';
import {yandexEndpoint} from './constants';
import type {
	TUserData,
	TCheckAuth,
	TRequestWithUserData,
} from './typing';

// Проверка активной авторизации
export const yandexCheckAuthorization = async (req: Request): Promise<TCheckAuth> => {
	const filteredCookies = filterCookies(req);
	const url = `${yandexEndpoint}/api/v2/auth/user`;
	try {
		const {data} = await axios.get(url, {
			headers: {
				cookie: filteredCookies,
			},
		});
		const userId = (data as TUserData).id;
		console.log('yandexCheckAuthorization userId=', userId);
		return {
			isAuth: true,
			user: data,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status !== 200) {
				return {
					isAuth: false,
				};
			}
		}
		throw new Error('Ошибка в проверке авторизации на стороне сервера');
	}
};

export const checkAuthorizationMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authUserData = await yandexCheckAuthorization(req);
		if (!authUserData.isAuth || !authUserData.user) {
			res.sendStatus(401);
			return;
		}
		// Сохраняем данные в Request для использования в API
		(req as TRequestWithUserData).authUserData = authUserData.user;
		next();
	} catch (e) {
		if (!res.headersSent) {
			res.sendStatus(500);
		}
	}
};
