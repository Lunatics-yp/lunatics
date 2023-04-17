import {Fn} from 'client/src/types';

export const useFadeModal = (timeout: number, callback: Fn<void>, arg: boolean) => {
	setTimeout(() => {
		callback(arg);
	}, timeout);
};
