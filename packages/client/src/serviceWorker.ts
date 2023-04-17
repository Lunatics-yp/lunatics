export {}; // Обходим ошибку TS (--isolatedModules)

declare const self: ServiceWorkerGlobalScope;

const serviceWorker: ServiceWorkerGlobalScope = self;

const DEBUG = true;

serviceWorker.addEventListener('install', (event: ExtendableEvent) => {
	if (DEBUG) {
		console.debug('SW: установка', event);
	}
});

serviceWorker.addEventListener('activate', (event) => {
	if (DEBUG) {
		console.debug('SW: активация', event);
	}
});
