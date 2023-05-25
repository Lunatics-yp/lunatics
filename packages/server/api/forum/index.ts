import type {Request, Response} from 'express';
import type {TUser} from 'server/api/models';
import type {TApiFunction} from 'server/api/forum/typing';
import {dbConnect} from 'server/api/sequelize';
import {isValidPostData} from 'server/api/utils/postDataValidator';
import type {TApiResponseData} from 'server/api/typing';
import {forumApi} from './forumApi';
import {topicApi} from './topicApi';
import {messageApi} from './messageApi';
import {messageReactionApi} from './messageReactionApi';

// Апи Форума
export const forumApiHandler = async (
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
	await dbConnect();
	const {action, data} = postData;
	let apiResponse: TApiResponseData = {};

	data.user_id = userId;

	const actions = {
		'forum.create': forumApi.create,
		'forum.rename': forumApi.edit,
		'forum.delete': forumApi.delete,
		'forum.list': forumApi.list,
		'topic.create': topicApi.create,
		'topic.rename': topicApi.edit,
		'topic.delete': topicApi.delete,
		'topic.list': topicApi.list,
		'message.create': messageApi.create,
		'message.edit': messageApi.edit,
		'message.delete': messageApi.delete,
		'message.list': messageApi.list,
		'reaction.set': messageReactionApi.createOrUpdate,
		'reaction.delete': messageReactionApi.delete,
	};

	if (action in actions) {
		const apiFunction = actions[action] as TApiFunction;
		apiResponse = await apiFunction(data);
	}

	if (apiResponse.data) {
		res.json({
			action: action,
			data: apiResponse.data,
		});
		return;
	}

	res.status(400)
		.json({reason: apiResponse.reason ?? 'Неизвестная ошибка в Апи Форума'});
	return;
};