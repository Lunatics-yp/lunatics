import {MessagesReactions} from '../models';
import type {TMessageReaction} from '../models';
import type {TApiResponseData} from '../typing';

// Апи Топика
export const messageReactionApi = {
	createOrUpdate: async (data: TMessageReaction): Promise<TApiResponseData> => {
		const {message_id, reaction_id, user_id} = data;
		if (!message_id || !reaction_id) {
			return {reason: 'Неправильные параметры для метода set messageReaction'};
		}
		try {
			const newMessageReaction = await MessagesReactions.upsert({
				message_id,
				reaction_id,
				user_id,
			});
			return {
				data: newMessageReaction,
			};
		} catch (e) {
			return {reason: 'Ошибка при создании строки в методе set messageReaction'};
		}
	},
	delete: async (data: TMessageReaction): Promise<TApiResponseData> => {
		const {message_id, user_id} = data;
		if (!message_id) {
			return {reason: 'Неправильные параметры для метода unset messageReaction'};
		}
		try {
			const isDeleted = await MessagesReactions.destroy({
				where: {message_id, user_id},
			});
			return {
				data: {deleted: isDeleted},
			};
		} catch (e) {
			return {reason: 'Ошибка удаления строки в методе unset messageReaction'};
		}
	},
};
