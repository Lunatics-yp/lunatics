import axios from 'axios';
import {API_CONFIG} from 'client/src/config/api';
import {interceptors} from './interceptors';

/**
 * Экземпляр AXIOS для взаимодействия c local API
 * @see: https://github.com/Lunatics-yp/lunatics/wiki
 */
const localApi = axios.create({
	baseURL: API_CONFIG.local,
	timeout: 5000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

interceptors(localApi);

export {localApi};
