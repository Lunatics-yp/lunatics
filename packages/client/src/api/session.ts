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
			alert('500 error');
		}
		return Promise.reject(error);
	}
);

session.interceptors.request.use(config => {
	return config;
});
