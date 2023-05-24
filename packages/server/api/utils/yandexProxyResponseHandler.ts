import type {Request, Response} from 'express';
import {yandexAuthUri} from 'server/api/auth/constants';
import type {IncomingMessage} from 'http';

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
		proxyRes.on('end', () => {
			try {
				const data = JSON.parse(responseBody);
				// Тут добавляем юзера в БД, если нет
				// И грузим его тему
				const currentTheme = 100;
				data.theme = currentTheme;
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
