import type {ViteDevServer} from 'vite';
import {createServer as createViteServer} from 'vite';
import cors from 'cors';
import express from 'express';
import path from 'path';

import {getSsrPath, ssrContent} from './ssr';

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

	app.get('/api', (_, res) => {
		res.json('👋 Howdy from the server :)');
	});

	app.use('*', async (req, res, next) => {
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
