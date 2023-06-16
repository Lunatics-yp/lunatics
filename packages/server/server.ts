import {
	yandexProxyAll,
	yandexProxyUserWithResponseHandler,
	checkAuthorizationMiddleware,
} from './authMiddleware';
import {xssMiddleware} from './xssMiddleware';
import type {ViteDevServer} from 'vite';
import {createServer as createViteServer} from 'vite';
import cors from 'cors';
import express from 'express';
import path from 'path';

import {forumApiHandler} from './api/forum';
import {dbConnect} from './api/sequelize';

import {getClientDir, getSsrPath, ssrContent} from './ssr';

import cookieParser from 'cookie-parser';

import {themeApiHandler} from './api/theme';

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

	app.use('/api/v2/auth/user', yandexProxyUserWithResponseHandler());
	app.use('/api/v2', yandexProxyAll());

	app.use(express.json());

	// Применяем middleware к приложению Express
	app.use('/api/forum', xssMiddleware);
	app.use('/api/forum', checkAuthorizationMiddleware);
	app.use('/api/forum', async (req, res) => {
		if (req.method !== 'POST') {
			res.sendStatus(500);
		}
		try {
			await forumApiHandler(req, res);
		} catch (e) {
			if (!res.headersSent) {
				res.sendStatus(500);
			}
		}
	});

	app.use('/api/themes', xssMiddleware);
	app.use('/api/themes', checkAuthorizationMiddleware);
	app.use('/api/themes', async (req, res) => {
		if (req.method !== 'POST') {
			res.sendStatus(500);
		}
		try {
			await themeApiHandler(req, res);
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	});

	app.use('*', cookieParser() as any, async (req, res, next) => {
		const requestType = req.method;
		if (requestType !== 'GET') {
			res.sendStatus(500);
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
