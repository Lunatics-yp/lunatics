import {createProxyMiddleware} from 'http-proxy-middleware';
import type {RequestHandler} from 'http-proxy-middleware';
import {yandexEndpoint} from './constants';
import {filterCookies} from './filterCookies';
import {yandexProxyResponseHandler} from 'server/api/utils';

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
		selfHandleResponse: true,
		onProxyRes: yandexProxyResponseHandler,
	});
};
