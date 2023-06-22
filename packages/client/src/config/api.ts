const getLocationHost = () => {
	return typeof location !== 'undefined' ? `${location.protocol}//${location.host}` : '';
};

export const API_CONFIG = {
	endpoint: `${getLocationHost()}/api/v2`,
	resources: `${getLocationHost()}/api/v2/resources`,
	local: `${getLocationHost()}/api`,
};

export const OAUTH_BASE_URL = 'https://oauth.yandex.ru/authorize';

export const OAUTH_YANDEX = 'oauth/yandex';

export const OAUTH_YANDEX_SERVICE_ID = 'oauth/yandex/service-id';

export const FORUM_URL = '/полный/путь';
