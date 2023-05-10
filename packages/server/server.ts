import type {ViteDevServer} from 'vite';
import {createServer as createViteServer} from 'vite';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

import type {TSsrRenderProps} from 'client/ssr/typing';

export async function startServer(isDev: boolean, port: number) {
	const app = express();
	app.use(cors());

	let vite: ViteDevServer;
	const ssrDevPath = path.dirname(require.resolve('client'));
	const ssrProdPath = require.resolve('client/ssr-dist/client.cjs');
	let distPath: string;

	if (isDev) {
		vite = await createViteServer({
			server: {middlewareMode: true},
			root: ssrDevPath,
			appType: 'custom',
		});
		app.use(vite.middlewares);
	} else {
		distPath = path.dirname(require.resolve('client/dist/index.html'));
		app.use('/assets', express.static(path.resolve(distPath, 'assets')));
	}

	app.get('/api', (_, res) => {
		res.json('👋 Howdy from the server :)');
	});

	app.use('*', async (req, res, next) => {
		const url = req.originalUrl;

		try {
			let template: string;
			let render: TSsrRenderProps;

			if (!isDev && distPath) {
				template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
				render = (await import(ssrProdPath)).render;
			} else {
				template = fs.readFileSync(path.resolve(ssrDevPath, 'index.html'), 'utf-8');
				template = await vite.transformIndexHtml(url, template);
				render = (await vite.ssrLoadModule(path.resolve(ssrDevPath, 'ssr/ssr.tsx'))).render;
			}

			const setupStore = (
				await vite.ssrLoadModule(path.resolve(ssrDevPath, 'src/stores/store.ts'))
			).setupStore;

			const store = setupStore();
			const initialState = store.getState();

			const appHtml = render(url, store);

			const stringifyState = JSON.stringify(initialState).replace(/</g, '\\u003c');
			const stateMarkup = `<script>window.__PRELOADED_STATE__ = ${stringifyState}</script>`;

			const html = template
				.replace('<!--ssr-outlet-->', appHtml)
				.replace('<!--preloadedState-->', stateMarkup);
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
