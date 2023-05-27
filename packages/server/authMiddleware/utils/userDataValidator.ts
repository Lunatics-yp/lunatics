import type {TUserData} from 'server/authMiddleware/typing';

// Проверка валидности пост-запроса
export const isValidUserData = (data: any): data is TUserData => {
	if (data === null || typeof data !== 'object') {
		return false;
	}
	const {id, login} = data;
	if (typeof id !== 'number' || typeof login !== 'string') {
		return false;
	}
	return true;
};
