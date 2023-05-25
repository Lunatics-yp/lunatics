import {Forums} from 'server/api/models';
import type {TForum} from 'server/api/models';
import type {TApiResponseData} from 'server/api/typing';

// Апи Форума
export const forumApi = {
	create: async (data: TForum): Promise<TApiResponseData> => {
		const {name, user_id} = data;
		if(!name){
			return {reason: 'Неправильные параметры для метода create forum'};
		}
		try {
			const newForum = await Forums.create({
				name,
				user_id,
			});
			return {
				data: newForum,
			};
		} catch (e) {
			return {reason: 'Ошибка при создании строки в методе create forum'};
		}
	},
	rename: async (data: TForum): Promise<TApiResponseData> => {
		const {id, name, user_id} = data;
		if(!id || !name){
			return {reason: 'Неправильные параметры для метода rename forum'};
		}
		try {
			await Forums.update(
				{name},
				{where: {id, user_id}},
			);
			const updatedForum = await Forums.findOne({where: {id}});
			return {
				data: updatedForum as object,
			};
		} catch (e) {
			return {reason: 'Ошибка при изменении строки в методе rename forum'};
		}
	},
	delete: async (data: TForum): Promise<TApiResponseData> => {
		const {id, user_id} = data;
		if(!id){
			return {reason: 'Неправильные параметры для метода delete forum'};
		}
		try {
			const isDeleted = await Forums.destroy({
				where: {id, user_id},
			});
			return {
				data: {deleted: isDeleted},
			};
		} catch (e) {
			return {reason: 'Ошибка удаления строки в методе delete forum'};
		}
	},
	list: async (): Promise<TApiResponseData> => {
		try {
			const forums = await Forums.findAll({
				order: [['id', 'DESC']],
			});
			return {
				data: forums,
			};
		} catch (e) {
			return {reason: 'Ошибка при получении списка форумов в методе list forum'};
		}
	},
};
