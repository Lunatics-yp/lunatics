/**
 * Адрес основного скрипта ServiceWorker
 */
const SW_SCRIPT_URL = '/serviceWorker.js';

/**
 * Проверяем поддержку ServiceWorker браузером
 */
const checkCompatibility = (debug = true) => {
	if ('serviceWorker' in navigator && caches) {
		return true;
	}
	if (debug) {
		console.warn('ServiceWorker и/или Cache не поддерживаются браузером');
	}
	return false;
};

/**
 * Регистрация ServiceWorker
 */
export const registerServiceWorker = (debug = true) => {
	if (!checkCompatibility(debug)) return;

	navigator.serviceWorker
		.register(SW_SCRIPT_URL)
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
export function unregisterServiceWorker(debug = true) {
	if (!checkCompatibility(debug)) return;

	navigator.serviceWorker
		.getRegistration(SW_SCRIPT_URL)
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
