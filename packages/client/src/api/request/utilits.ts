import {TErrorAPI} from '../typingAPI';

export const isErrorAPI = (data: unknown | TErrorAPI): data is TErrorAPI => {
	return data && (data as TErrorAPI).reason !== undefined;
};
