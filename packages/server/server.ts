import {
	yandexProxyAll,
	yandexProxyUserWithResponseHandler,
	checkAuthorizationMiddleware,
} from './authMiddleware';
import {cspMiddleware} from './cspMiddleware';
import {xssMiddleware} from './xssMiddleware';
import type {ViteDevServer} from 'vite';
import {createServer as createViteServer} from 'vite';
import cors from 'cors';
import express from 'express';
import path from 'path';

import {getClientDir, getSsrPath, ssrContent} from './ssr';

import cookieParser from 'cookie-parser';

import {
	apiMiddleware,
	themeApiHandler,
	forumApiHandler,
	dbConnect,
} from './api';

export async function startServer(isDev: boolean, port: number) {
	const app = express();
	app.use(cors());

	let vite: ViteDevServer;

	const distPath = path.dirname(path.resolve(getClientDir(), 'dist/index.html'));

	await dbConnect();

	// Раздаём статику для production
	if (!isDev) {
		app.use('/favicon.png', express.static(path.resolve(distPath, 'favicon.png')));
		app.use('/serviceWorker.js', express.static(path.resolve(distPath, 'serviceWorker.js')));
		app.use('/assets', express.static(path.resolve(distPath, 'assets')));
	}

	if (isDev) {
		vite = await createViteServer({
			server: {middlewareMode: true},
			root: getSsrPath(isDev),
			appType: 'custom',
		});
		app.use(vite.middlewares);
	}
  
	app.use(cspMiddleware());
  
	// Прокси
	app.use('/api/v2/auth/user', yandexProxyUserWithResponseHandler());
	app.use('/api/v2', yandexProxyAll());

	app.use(express.json());

	// Апи форума
	app.use('/api/forum', xssMiddleware);
	app.use('/api/forum', checkAuthorizationMiddleware);
	app.use('/api/forum', apiMiddleware(forumApiHandler));

	// Апи темы
	app.use('/api/themes', xssMiddleware);
	app.use('/api/themes', checkAuthorizationMiddleware);
	app.use('/api/themes', apiMiddleware(themeApiHandler));

	// Прочие запросы
	app.use('*', cookieParser() as any, async (req, res, next) => {
		const requestType = req.method;
		if (requestType !== 'GET') {
			res.sendStatus(500);
			return;
		}
		try {
			const url = req.originalUrl;
			const html = await ssrContent(vite, url, isDev);
			res.status(200).set({'Content-Type': 'text/html'}).end(html);
		} catch (e) {
			if (isDev) {
				vite.ssrFixStacktrace(e as Error);
			}
			next(e);
		}
	});

	app.listen(port, () => {
		console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
	});
}
