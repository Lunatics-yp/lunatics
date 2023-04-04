import axios from 'axios';

export const session = axios.create({
	baseURL: 'https://ya-praktikum.tech/api/v2'
});

session.interceptors.response.use(
	response => response,

	error => {
		if (error.response.status === 401) {
			window.location.href = '/';
		}
		if (error.response.status === 500) {
			window.location.href = '/page500';
			console.error(error.response);
		}
		return Promise.reject(error);
	}
);

session.interceptors.request.use(config => {
	return config;
});
