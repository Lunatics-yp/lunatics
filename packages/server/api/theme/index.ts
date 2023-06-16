import type {Response} from 'express';
import {isValidPostData} from '../utils/postDataValidator';
import {themeApi} from './themeApi';
import type {TApiFunction, TApiResponseData} from './typing';
import type {TRequestWithUserData} from '../../authMiddleware/typing';

// Апи Тем
export const themeApiHandler = async (
	req: TRequestWithUserData,
	res: Response
): Promise<void> => {
	const postData = req.body;
	const userId = req.authUserData!.id;
	const isValid = isValidPostData(postData);
	if (!isValid) {
		res.status(400).json({reason: 'Неправильный запрос'});
		return;
	}
	const {action, data} = postData;
	data.userId = userId;

	let apiResponse: TApiResponseData = {};

	data.user_id = userId; // Евгения, тут твой user id после проверки авторизации

	const actions = {
		'theme.get': themeApi.get,
		'theme.change': themeApi.change,
	};

	if (action in actions) {
		const apiFunction = actions[action] as TApiFunction;
		apiResponse = await apiFunction(data);
	}

	if (apiResponse.data) {
		res.json({
			data: apiResponse,
		});
		return;
	}
	res.status(400)
		.json({reason: apiResponse.reason ?? 'ошибка в Апи Тем'});
	return;
};
