import axios from 'axios';
import {baseUrl} from 'client/src/config/api';
import {interceptors} from './interceptors';

/**
 * Экземпляр AXIOS для взаимодействия c API Яндекс.Практикума
 * @see: https://ya-praktikum.tech/api/v2/swagger/
 */
const api1 = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

interceptors(api1);

export {api1};
