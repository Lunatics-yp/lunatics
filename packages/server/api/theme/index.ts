import type {Request, Response} from 'express';
import {dbConnect} from 'server/api/sequelize';
import {isValidPostData} from 'server/api/utils/postDataValidator';
import {themeApi} from 'server/api/theme/themeApi';
import type {TApiFunction, TApiResponseData} from 'server/api/theme/typing';

// Апи Тем
export const themeApiHandler = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const postData = req.body.data;
	const isValid = isValidPostData(postData);
	if (!isValid) {
		res.status(400).json({reason: 'Неправильный запрос'});
		return;
	}
	await dbConnect();
	const {action, data} = postData;

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
