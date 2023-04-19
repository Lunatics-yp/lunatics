/**
 * Адрес основного скрипта ServiceWorker
 */
const SW_SCRIPT_URL = '/serviceWorker.js';

/**
 * Проверяем поддержку ServiceWorker браузером
 */
const checkCompatibility = (debug = false) => {
	if ('serviceWorker' in navigator && caches) {
		return true;
	}
	if (debug) {
		console.warn('ServiceWorker и/или Cache не поддерживаются браузером');
	}
	return false;
};

/**
 * Задаем адрес файла ServiceWorker c параметром debug (чтобы передать в js-файл)
 * @param debug
 */
const scriptUrl = (debug = false) => {
	const urlParams = new URLSearchParams({
		debug: String(Number(debug)),
	}).toString();
	return `${SW_SCRIPT_URL}?${urlParams}`;
};

/**
 * Регистрация ServiceWorker
 */
export const registerServiceWorker = (debug = false) => {
	if (!checkCompatibility(debug)) return;

	navigator.serviceWorker
		.register(scriptUrl(debug))
		.then(registration => {
			if (debug) {
				console.debug('[sw] зарегистрирован', registration.scope);
			}
		})
		.catch(error => {
			if (debug) {
				console.error('[sw] ошибка регистрации', error);
			}
		});
};

/**
 * Снятие регистрации ServiceWorker
 */
export function unregisterServiceWorker(debug = false) {
	if (!checkCompatibility(debug)) return;

	navigator.serviceWorker
		.getRegistration(scriptUrl(debug))
		.then(registration => {
			if (registration instanceof ServiceWorkerRegistration) {
				registration.unregister()
					.then(success => {
						if (!success) {
							Promise.reject();
						}
						if (debug) {
							console.debug('[sw] снята регистрация', registration);
						}
					})
					.catch(error => {
						if (debug) {
							console.error('[sw] ошибка снятия регистрации', registration, error);
						}
					});
			}
		});
}
