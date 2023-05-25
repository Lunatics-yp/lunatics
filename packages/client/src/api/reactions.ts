import {localApi} from './request/localApi';

export const reactionsAPI = {
	setReaction: (data: Record<string, any>) => (
		localApi.post('/forum', data)
	),
};