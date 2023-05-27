import {
	yandexProxyAll,
	yandexProxyUserWithResponseHandler,
	yandexCheckAuthorization,
} from 'server/authMiddleware';
import {xssMiddleware} from 'server/xssMiddleware';
import type {ViteDevServer} from 'vite';
import {createServer as createViteServer} from 'vite';
import cors from 'cors';
import express from 'express';
import path from 'path';

import {forumApiHandler} from 'server/api/forum';
import {dbConnect} from 'server/api/sequelize';

import {getSsrPath, ssrContent} from './ssr';

import cookieParser from 'cookie-parser';

export async function startServer(isDev: boolean, port: number) {
	const app = express();
	app.use(cors());

	let vite: ViteDevServer;

	await dbConnect();

	if (isDev) {
		vite = await createViteServer({
			server: {middlewareMode: true},
			root: getSsrPath(isDev),
			appType: 'custom',
		});
		app.use(vite.middlewares);
	} else {
		const distPath = path.dirname(require.resolve('client/dist/index.html'));
		app.use('/assets', express.static(path.resolve(distPath, 'assets')));
	}

	app.use('/api/v2/auth/user', yandexProxyUserWithResponseHandler());
	app.use('/api/v2', yandexProxyAll());

	// Применяем middleware к приложению Express
	app.use('/api/forum', xssMiddleware);
	app.use('/api/forum', async (req, res) => {
		try {
			const authUserData = await yandexCheckAuthorization(req);
			if (!authUserData.isAuth || !authUserData.user) {
				res.sendStatus(401);
				return;
			}
			app.use(express.json());
			await forumApiHandler(req, res, authUserData.user);
		} catch (e) {
			if (!res.headersSent) {
				res.sendStatus(500);
			}
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
