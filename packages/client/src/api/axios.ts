import axiosLib from 'axios';
import {API_CONFIG} from 'client/src/config/api';

export const axios = axiosLib.create({
	baseURL: API_CONFIG.endpoint,
});

axios.interceptors.response.use(
	(response) => response,

	error => {
		if (error.response.status === 401) {
			window.location.href = '/';
			alert('Неправильные данные');
		}
		if (error.response.status === 500) {
			alert('Сервер сломан');
		}
		return Promise.reject(error);
	},
);
