import type {ViteDevServer} from 'vite';
import type {TSsrRenderProps} from 'client/ssr/typing';
import fs from 'fs';
import path from 'path';

const ssrDevPath = path.dirname(require.resolve('client'));
const ssrProdPath = require.resolve('client/ssr-dist/client.cjs');

export const getSsrPath = (isDev: boolean) => isDev ? ssrDevPath : ssrProdPath;

export async function ssrContent(vite: ViteDevServer, url: string, isDev: boolean) {

	let render: TSsrRenderProps;

	let template = fs.readFileSync(
		path.resolve(getSsrPath(isDev), 'index.html'),
		'utf-8',
	);

	if (isDev && vite) {
		template = await vite.transformIndexHtml(url, template);
		render = (await vite.ssrLoadModule(path.resolve(ssrDevPath, 'ssr/ssr.tsx'))).render;
	} else {
		render = (await import(ssrProdPath)).render;
	}

	const setupStore = (await vite.ssrLoadModule(path.resolve(ssrDevPath, 'src/stores/store.ts')))
		.setupStore;

	const store = setupStore();
	const initialState = store.getState();

	const stringifyState = JSON.stringify(initialState).replace(/</g, '\\u003c');
	const stateMarkup = `<script>window.__PRELOADED_STATE__ = ${stringifyState}</script>`;

	const appHtml = render(url, store);
	return template
		.replace('<!--ssr-outlet-->', appHtml)
		.replace('<!--preloadedState-->', stateMarkup);
}
