import type {TApiFunction} from './typing';
import {isValidPostData} from '../utils/postDataValidator';
import type {TApi, TApiResponseData} from '../typing';
import {leaderboardApi} from './leaderboardApi';

// Апи Лидерборда
export const leaderboardApiHandler: TApi = async (
	req,
	res,
) => {
	const postData = req.body;
	const userId = req.authUserData!.id;

	if (!isValidPostData(postData)) {
		res.status(400).json({reason: 'Неправильный запрос'});
		return;
	}

	const {action, data} = postData;
	let apiResponse: TApiResponseData = {};

	data.user_id = userId;

	const actions = {
		'leaderboard.set': leaderboardApi.set,
		'leaderboard.list': leaderboardApi.list,
	};

	if (action in actions) {
		const apiFunction = actions[action] as TApiFunction;
		apiResponse = await apiFunction(data);
	} else {
		res.status(400)
			.json({reason: apiResponse.reason ?? 'Неизвестный action'});
	}

	if (!apiResponse.reason) {
		res.json({
			action: action,
			data: apiResponse.data ?? {},
		});
		return;
	}

	res.status(400)
		.json({reason: apiResponse.reason ?? 'Неизвестная ошибка в Апи Лидерборда'});
	return;
};
