import {OAUTH_BASE_URL, OAUTH_REDIRECT_URI} from '../config/api';
import {isErrorAPI} from './request/utilits';
import {api} from './request';
import {
	TOAuthYandexRequestData,
	TOAuthYandexResponseData,
	TServiceIdRequestData,
	TServiceIdResponseData,
} from './typing';

export const oAuthAPI = {
	oAuth: (data: TOAuthYandexRequestData) => (
		api.post<TOAuthYandexResponseData, TOAuthYandexResponseData>('oauth/yandex', data)
	),
	getServiceId: (request_uri: TServiceIdRequestData) => (
		api.get<TServiceIdResponseData, TServiceIdResponseData>
		('oauth/yandex/service-id', {params: {request_uri: request_uri}})
	),
	getRedirectOAuthUrl: (data: TServiceIdRequestData) => (
		`${OAUTH_BASE_URL}/?response_type=code&client_id=${data}&redirect_uri=${OAUTH_REDIRECT_URI}`
	),
	loginWithOAuth: () => (
		oAuthAPI.getServiceId(OAUTH_REDIRECT_URI)
			.then((data) => {
				if (!isErrorAPI(data)) {
					return data.service_id;
				}
			})
			.then((data) => {
				if (data) {
					location.href = oAuthAPI.getRedirectOAuthUrl(data);
				}
			})
	),
};
