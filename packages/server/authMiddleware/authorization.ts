import {createProxyMiddleware} from 'http-proxy-middleware';
import type {RequestHandler} from 'http-proxy-middleware';
import {yandexEndpoint} from 'server/authMiddleware/constants';
import {filterCookies, yandexProxyResponseHandler} from 'server/authMiddleware/utils';

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
	});
};

// Прокси для запросов к Яндекс Свагер Апи
export const yandexProxyUserInfoOnly = (): RequestHandler => {
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
		selfHandleResponse: true,
		onProxyRes: yandexProxyResponseHandler,
	});
};
