import type {TUser} from 'server/api/auth/typing';
import {createProxyMiddleware} from 'http-proxy-middleware';
import type {RequestHandler} from 'http-proxy-middleware';
import {yandexEndpoint, yandexAuthUri} from './constants';
import {filterCookies} from './filterCookies';

// Прокси для запросов к Яндекс Свагер Апи
export const yandexProxy = (): RequestHandler => {
	return createProxyMiddleware({
		changeOrigin: true,
		cookieDomainRewrite: {
			'*': '',
		},
		target: yandexEndpoint,
		onProxyReq: (proxyReq, req) => {
			const filteredCookies = filterCookies(req);
			proxyReq.setHeader('cookie', filteredCookies);
		},
		onProxyRes: (proxyRes, req, res) => {
			// Получение тела ответа если был запрос на авторизацию
			if (req.url === yandexAuthUri && req.method === 'GET') {
				let responseBody = '';
				proxyRes.on('data', (chunk) => {
					responseBody += chunk;
				});
				proxyRes.on('end', () => {
					const data = JSON.parse(responseBody) as TUser;
					const userId = data.id;
					if(userId){
						console.log('yandexProxy userId=', userId);
					}
				});
			}
		},
	});
};
