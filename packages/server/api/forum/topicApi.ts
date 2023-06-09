import {Topics, Messages, Users} from '../models';
import type {TTopic} from '../models';
import type {TApiResponseData} from '../typing';
import type {TTopicsRespond} from './typing';

// Апи Топика
export const topicApi = {
	create: async (data: TTopic): Promise<TApiResponseData> => {
		const {name, forum_id, user_id} = data;
		if (!name || !forum_id) {
			return {reason: 'Неправильные параметры для метода create topic'};
		}
		try {
			const newTopic = await Topics.create({
				name,
				forum_id,
				user_id,
			});
			return {
				data: newTopic,
			};
		} catch (e) {
			return {reason: 'Ошибка при создании строки в методе create topic'};
		}
	},
	edit: async (data: TTopic): Promise<TApiResponseData> => {
		const {id, name, user_id} = data;
		if (!id || !name) {
			return {reason: 'Неправильные параметры для метода rename topic'};
		}
		try {
			await Topics.update(
				{name},
				{where: {id, user_id}},
			);
			const updatedTopic = await Topics.findOne({where: {id}});
			return {
				data: updatedTopic as object,
			};
		} catch (e) {
			return {reason: 'Ошибка при изменении строки в методе rename topic'};
		}
	},
	delete: async (data: TTopic): Promise<TApiResponseData> => {
		const {id, user_id} = data;
		if (!id) {
			return {reason: 'Неправильные параметры для метода delete topic'};
		}
		try {
			const isDeleted = await Topics.destroy({
				where: {id, user_id},
			});
			return {
				data: {deleted: isDeleted},
			};
		} catch (e) {
			return {reason: 'Ошибка удаления строки в методе delete topic'};
		}
	},
	list: async (data: TTopic): Promise<TApiResponseData> => {
		const {forum_id} = data;
		if (!forum_id) {
			return {reason: 'Неправильные параметры для метода list topic'};
		}
		try {
			const topicsSQL = await Topics.findAll({
				where: {forum_id},
				include: [
					{
						model: Users,
					},
					{
						model: Messages,
						order: [['id', 'DESC']],
						limit: 1,
						required: false,
						include: [
							{
								model: Users,
							},
						],
					},
				],
			});

			/** Тут я никак не смог добиться, чтобы в ответе был один объект
			 * с последним сообщением, поэтому добавил обработку ответа и избавляюсь от массива */
			const topics = JSON.parse(JSON.stringify(topicsSQL)) as TTopicsRespond;
			topics.forEach(topic => {
				topic['LastMessage'] = topic['Messages'] ? topic['Messages'][0] ?? {} : {};
				delete topic['Messages'];
			});

			return {
				data: topics,
			};
		} catch (e) {
			console.log(e);
			return {reason: 'Ошибка при получении списка топиков в методе list topic'};
		}
	},
};
