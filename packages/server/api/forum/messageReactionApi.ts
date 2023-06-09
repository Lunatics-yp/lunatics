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
			// Проверяем наличие записи
			const existingMessageReaction = await MessagesReactions.findOne({
				where: {
					message_id,
					user_id,
				},
			});

			const newMessageReaction = existingMessageReaction
				// Если запись есть, то обновляем reaction_id
				? await existingMessageReaction.update({reaction_id})
				// Если нет, то создаём новую
				: await MessagesReactions.create({
					message_id,
					user_id,
					reaction_id,
				});

			return {
				data: newMessageReaction,
			};
		} catch (e) {
			console.log(e);
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
			console.error(e);
			return {reason: 'Ошибка удаления строки в методе unset messageReaction'};
		}
	},
};
