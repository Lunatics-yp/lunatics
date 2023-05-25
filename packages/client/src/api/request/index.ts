import axios from 'axios';
import {API_CONFIG} from 'client/src/config/api';
import {interceptors} from './interceptors';

/**
 * Экземпляр AXIOS для взаимодействия c API Яндекс.Практикума
 * @see: https://ya-praktikum.tech/api/v2/swagger/
 */

const options = {
	timeout: 5000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
};

const api = axios.create({
	baseURL: API_CONFIG.endpoint,
	...options,
});

interceptors(api);

const apiForum = axios.create({
	baseURL: '',
	...options,
});

interceptors(apiForum);

export {api, apiForum};
