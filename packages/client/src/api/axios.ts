import axiosLib from 'axios';

export const axios = axiosLib.create({
	baseURL: 'https://ya-praktikum.tech/api/v2',
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
