import type {Request, Response} from 'express';
import type {IncomingMessage} from 'http';
import {userAPI} from '../../api/user';
import {yandexAuthUri} from '../constants';
import type {TUserData} from '../typing';
import {isValidUserData} from './userDataValidator';
import {themeApi} from 'server/api/theme/themeApi';

const yandexProxyResponseHandler = (
	proxyRes: IncomingMessage,
	req: Request,
	res: Response,
): void => {
	// Обрабатываем только запросы авторизации
	if (req.url === yandexAuthUri && req.method === 'GET') {
		// Сначала грузим ответ
		let responseBody = '';
		proxyRes.setEncoding('utf-8');
		proxyRes.on('data', (chunk) => {
			responseBody += chunk;
		});
		// Затем обрабатываем полученный ответ
		proxyRes.on('end', async () => {
			try {
				const data = JSON.parse(responseBody) as TUserData;
				// Если ответ успешный и нет ошибки
				if (res.statusCode === 200 && isValidUserData(data)) {
					// Добавляем/обновляем юзера в БД
					await userAPI.createOrUpdate({
						id: data.id,
						login: data.login,
						display_name: data.login,
						avatar: data.avatar,
					});
					// И грузим его тему
					data.theme = await themeApi.get({userId: data.id});
				}
				// Собаем data обратно в строку и отправляем ответ клиенту
				const modifiedResponse = JSON.stringify(data);
				res.setHeader('Content-Type', 'application/json;charset=utf-8');
				res.end(modifiedResponse);
			} catch (error) {
				console.log(error);
			}
		});
	}
};

export {yandexProxyResponseHandler};
