import type {Request, Response} from 'express';
import {isValidPostData} from '../utils/postDataValidator';
import {themeApi} from './themeApi';
import type {TApiFunction, TApiResponseData} from './typing';
import type {TUser} from '../models';

// Апи Тем
export const themeApiHandler = async (
	req: Request,
	res: Response,
	userData: TUser,
): Promise<void> => {
	const postData = req.body;
	const userId = userData.id;
	const isValid = isValidPostData(postData);
	if (!isValid) {
		res.status(400).json({reason: 'Неправильный запрос'});
		return;
	}
	const {action, data} = postData;
	data.userId = userId;

	let apiResponse: TApiResponseData = {};

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
