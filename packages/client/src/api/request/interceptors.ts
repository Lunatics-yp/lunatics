import {AxiosInstance, AxiosResponse} from 'axios';

/**
 * Обрабатываем ответ от API (чтобы всегда был объектом)
 * @param response
 */
const getResonseData = (response: AxiosResponse) => {
	try {
		if (typeof response.data === 'object') {
			return response.data;
		}
		if (response.data.length && response.data !== 'OK') {
			return {reason: response.data};
		}
	}
	catch (e) {
		console.error(e);
	}
	return {};
};

// Обработка успешного запроса
const checkResponse = (response: AxiosResponse) => getResonseData(response);

// Обработка неуспешного запроса
const checkResponseError = ({response}: {response: AxiosResponse}) => getResonseData(response);

export const interceptors = (api: AxiosInstance) => {
	api.interceptors.response.use(checkResponse, checkResponseError);
};
