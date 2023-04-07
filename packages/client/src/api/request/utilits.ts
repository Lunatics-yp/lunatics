import {TErrorAPI} from '../typingAPI';

export const isErrorAPI = (data: unknown): data is TErrorAPI => {
	return typeof data === 'object' && (data as TErrorAPI).reason !== undefined;
};
