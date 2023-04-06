import {TErrorAPI} from '../types';

export const isErrorAPI = (data: unknown | TErrorAPI): data is TErrorAPI => {
	return (data as TErrorAPI).reason !== undefined;
};
