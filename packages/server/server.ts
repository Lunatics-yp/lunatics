import {yandexProxyAll, yandexProxyUserInfoOnly, yandexCheckAuthorization} from 'server/api/auth';
import type {ViteDevServer} from 'vite';
import {createServer as createViteServer} from 'vite';
import cors from 'cors';
import express from 'express';
import path from 'path';

import {forumApi} from 'server/api/forum';

import {getSsrPath, ssrContent} from './ssr';

import cookieParser from 'cookie-parser';

export async function startServer(isDev: boolean, port: number) {
	const app = express();
	app.use(cors());

	let vite: ViteDevServer;

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

	app.use('/api/v2/auth/user', yandexProxyUserInfoOnly());
	app.use('/api/v2', yandexProxyAll());

	app.use('/api/forum', async (req, res) => {
		try {
			const authUserData = await yandexCheckAuthorization(req);
			if (!authUserData.isAuth) {
				res.sendStatus(403);
				return;
			}
			app.use(express.json());
			await forumApi(req, res);
		} catch (e) {
			console.log(e);
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
