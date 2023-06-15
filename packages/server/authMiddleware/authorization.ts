import {createProxyMiddleware} from 'http-proxy-middleware';
import type {RequestHandler} from 'http-proxy-middleware';
import {yandexEndpoint} from './constants';
import {filterCookies, yandexProxyResponseHandler} from './utils';

// Прокси для запросов к Яндекс Свагер Апи
export const yandexProxyAll = (): RequestHandler => {
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
		secure: false,
	});
};

// Прокси для запросов к Яндекс Свагер Апи с обработкой ответа (для auth/user)
export const yandexProxyUserWithResponseHandler = (): RequestHandler => {
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
		secure: false,
		selfHandleResponse: true,
		onProxyRes: yandexProxyResponseHandler,
	});
};
