export {}; // Обходим ошибку TS (--isolatedModules)

declare const self: ServiceWorkerGlobalScope;

const DEBUG = false;

// ID кеша
const CACHE_NAME = 'lun-cache-1';

// Список URL для предварительного кеширования
const CACHE_URLS = ['/', '/index.html'];

// Список типов данных для кеширования
const CACHE_CONTENT_TYPES = ['document', 'script', 'style', 'font', 'image', 'audio', 'object'];

const FALLBACK = `
	<div style='padding-top: 2rem; text-align: center;'>
		<h1>Lunatics не в сети</h1>
		<p>Кажется злые марсиане снова захватили Луну&hellip;</p>
	</div>
`;

// При установке SW кешируем часть данных (статику)
self.addEventListener('install', (event: ExtendableEvent) => {
	if (DEBUG) {
		console.debug('[sw] установка', event);
	}
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			// `addAll()` собирает и кеширует статику из массива ссылок
			.then(cache => cache.addAll(CACHE_URLS))
			.then(() => {
				// `skipWaiting()` для активации SW сразу (не ждём перезагрузку страницы)
				self.skipWaiting();
				if (DEBUG) {
					console.debug('[sw] кэш добавлен', event);
				}
			}),
	);
});

// Активация
self.addEventListener('activate', (event) => {
	if (DEBUG) {
		console.debug('[sw] активация', event);
	}
	// `self.clients.claim()` позволяет SW начать перехватывать запросы с самого начала
	// работает вместе с `skipWaiting()`, позволяя использовать `fallback` с самых первых запросов
	event.waitUntil(self.clients.claim());
});

// Обработка сетевых запросов
self.addEventListener('fetch', async (event: FetchEvent) => {
	const {request} = event;

	if (DEBUG) {
		console.debug('[sw] fetch', request.destination, event);
	}

	// Кешируем только выбранные типы данных
	if (!CACHE_CONTENT_TYPES.includes(request.destination)) {
		return;
	}

	// Не кешируем расширения Chrome
	if (request.url.startsWith('chrome-extension://')) {
		return;
	}

	event.respondWith(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				return cache.match(request).then(cachedResponse => {

					// Делаем запрос для обновления кеша
					const fetchedResponse = fetch(request)
						.then(networkResponse => {
							if (networkResponse.status === 200) {
								cache.put(request, networkResponse.clone());
							}
							return networkResponse;
						})
						.catch(fetchError => {
							if (DEBUG) {
								console.warn('[sw] проблема с сетью', fetchError);
							}
							return cachedResponse ?? useFallback();
						});

					// Если есть кеш, возвращаем его
					if (cachedResponse) {
						if (DEBUG) {
							console.debug('[sw] получаем данные из кеша', request.url);
						}
						return cachedResponse;
					}

					// Если кеша нет, возвращаем ответ из сети
					if (DEBUG) {
						console.debug('[sw] получаем данные из сети', request.url);
					}
					return fetchedResponse;
				});
			})
			.catch(cacheError => {
				if (DEBUG) {
					console.warn('[sw] ошибка кеша', cacheError);
				}
				return useFallback();
			}),
	);
});

/**
 * Возвращаем блок-заглушку при отсутствии интернета
  */
const useFallback = () => {
	return Promise.resolve(new Response(FALLBACK, {headers: {
		'Content-Type': 'text/html; charset=utf-8',
	}}));
};
