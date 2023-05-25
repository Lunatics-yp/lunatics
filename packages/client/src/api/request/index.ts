import axios from 'axios';
import {API_CONFIG} from 'client/src/config/api';
import {interceptors} from './interceptors';

/**
 * Экземпляр AXIOS для взаимодействия c API Яндекс.Практикума
 * @see: https://ya-praktikum.tech/api/v2/swagger/
 */
const api = axios.create({
	baseURL: API_CONFIG.endpoint,
	timeout: 5000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

interceptors(api);

const api1 = {...api, baseURL: ''};

export {api, api1};
