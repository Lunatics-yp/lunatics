import {
	OAUTH_BASE_URL,
	OAUTH_YANDEX,
	OAUTH_YANDEX_SERVICE_ID,
} from '../config/api';
import {isErrorAPI, getLocationOrigin} from './request/utilits';
import {api} from './request';
import {
	TOAuthYandexRequestData,
	TOAuthYandexResponseData,
	TServiceIdRequestData,
	TServiceIdResponseData,
} from './typing';

export const oAuthAPI = {
	oAuth: (data: TOAuthYandexRequestData) => (
		api.post<TOAuthYandexResponseData, TOAuthYandexResponseData>(OAUTH_YANDEX, data)
	),
	getServiceId: (request_uri: TServiceIdRequestData) => (
		api.get<TServiceIdResponseData, TServiceIdResponseData>
		(OAUTH_YANDEX_SERVICE_ID, {params: {request_uri: request_uri}})
	),
	getRedirectOAuthUrl: (data: TServiceIdRequestData) => (
		// eslint-disable-next-line max-len
		`${OAUTH_BASE_URL}/?response_type=code&client_id=${data}&redirect_uri=${getLocationOrigin()}`
	),
	loginWithOAuth: () => (
		oAuthAPI.getServiceId(getLocationOrigin())
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
