import type {TPostData} from 'server/api/typing';

// Проверка валидности пост-запроса
export const isValidPostData = (postData: any): postData is TPostData => {
	if (postData === null || typeof postData !== 'object') {
		return false;
	}
	const {action, data} = postData;
	if (typeof action !== 'string' || typeof data !== 'object') {
		return false;
	}
	return true;
};
