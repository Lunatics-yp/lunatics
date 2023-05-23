import type {TPostData} from 'server/api/typing';

// Проверка валидности пост-запроса
export const isValidPostData = (data: any): data is TPostData => {
	if (data === null || typeof data !== 'object') {
		return false;
	}
	const {action} = data;
	if (typeof action !== 'string') {
		return false;
	}
	return true;
};
