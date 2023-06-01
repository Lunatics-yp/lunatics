import {localApi} from './request/localApi';
import {
	REACTIONS_ACTION,
	TDeleteReactionRequestData,
	TDeleteReactionResponseData,
	TSetReactionRequestData,
	TSetReactionResponseData,
} from './typing';

export const reactionsAPI = {
	setReaction: (data: TSetReactionRequestData) =>
		localApi.post<TSetReactionResponseData, TSetReactionResponseData>('/forum', {
			action: REACTIONS_ACTION.SET,
			data: data,
		}),
	deleteReaction: (data: TDeleteReactionRequestData) =>
		localApi.post<TDeleteReactionResponseData, TDeleteReactionResponseData>('/forum', {
			action: REACTIONS_ACTION.DELETE,
			data: data,
		}),
};
