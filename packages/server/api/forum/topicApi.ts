import {Topics} from 'server/api/models';
import type {TTopic} from 'server/api/models';
import type {TApiResponseData} from 'server/api/typing';

// Апи Топика
export const topicApi = {
	create: async (data: TTopic): Promise<TApiResponseData> => {
		const {name, forum_id, user_id} = data;
		if(!name || !forum_id){
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
	rename: async (data: TTopic): Promise<TApiResponseData> => {
		const {id, name, user_id} = data;
		if(!id || !name){
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
		if(!id){
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
};
