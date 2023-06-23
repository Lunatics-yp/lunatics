import type {ViteDevServer} from 'vite';
import type {TSsrRenderProps} from 'client/ssr/typing';
import fs from 'fs';
import path from 'path';

export const getClientDir = () => {
	let clientDir: string;
	try {
		clientDir = require.resolve('client');
	} catch (e) {
		// хак для docker, чтобы дать ему корректный путь до папки проекта client
		clientDir = '/client/index.html';
	}
	return path.dirname(clientDir);
};

// Путь до подпроекта client
const ssrDevPath = getClientDir();

// Путь до билда скрипта для SSR (из client)
const ssrProdPath = path.resolve(getClientDir(), 'ssr-dist/client.cjs');

// Путь до билда подпроекта client
const distPath = path.dirname(path.resolve(getClientDir(), 'dist/index.html'));

export const getSsrPath = (isDev: boolean) => isDev ? ssrDevPath : ssrProdPath;

export async function ssrContent(vite: ViteDevServer, url: string, isDev: boolean) {
	if (isDev && !vite) {
		throw Error('Не запущен ViteDevServer');
	}

	let render: TSsrRenderProps;
	let setupStore;
	let initialState;

	const templatePath = isDev
		? path.resolve(ssrDevPath, 'index.html')
		: path.resolve(distPath, 'index.html');

	let template = fs.readFileSync(templatePath, 'utf-8');

	if (isDev) {
		template = await vite.transformIndexHtml(url, template);
		const pathFileSSR = path.resolve(ssrDevPath, 'ssr/ssr.tsx');
		render = (await vite.ssrLoadModule(pathFileSSR)).render;
	} else {
		render = (await import(ssrProdPath)).render;
	}

	const [initialStateRender, appHtml] = render(url);

	if (isDev) {
		const pathFileStore = path.resolve(ssrDevPath, 'src/stores/store.ts');
		setupStore = (await vite.ssrLoadModule(pathFileStore)).setupStore;
		const store = setupStore();
		initialState = store.getState();
	} else {
		initialState = initialStateRender;
	}

	const stringifyState = JSON.stringify(initialState).replace(/</g, '\\u003c');
	const stateMarkup = `<script>window.__PRELOADED_STATE__ = ${stringifyState}</script>`;

	return template
		.replace('<!--ssr-outlet-->', appHtml)
		.replace('<!--preloadedState-->', stateMarkup);
}
