import {messageApi} from '../forum/messageApi';
import {MessagesReactions} from '../models';
import type {TMessageReaction} from '../models';
import type {TApiResponseData, TReactionResponse} from '../typing';
import {sequelize} from '../sequelize';
import {sequelizeToObject} from '../utils/sequelizeToObject';

// Апи Топика
export const messageReactionApi = {
	createOrUpdate: async (data: TMessageReaction): Promise<TApiResponseData> => {
		const {message_id, reaction_id, user_id} = data;
		if (!message_id || !reaction_id) {
			return {reason: 'Неправильные параметры для метода set messageReaction'};
		}
		try {
			const newMessageReaction = await sequelize.query(
				`INSERT INTO "MessagesReactions" ("message_id", "user_id", "reaction_id")
				VALUES (${message_id}, ${user_id}, ${reaction_id})
				ON CONFLICT ("message_id", "user_id") DO
				UPDATE SET "reaction_id" = ${reaction_id}
				RETURNING "message_id", "user_id", "reaction_id"`);

			const data = sequelizeToObject<TReactionResponse>(newMessageReaction[0][0]);
			data.Message = await messageApi.get(message_id, user_id);

			return {
				data,
			};
		} catch (e) {
			console.log(e);
			return {reason: 'Ошибка при создании строки в методе set messageReaction'};
		}
	},
	delete: async (data: TMessageReaction): Promise<TApiResponseData> => {
		const {message_id, user_id} = data;
		if (!message_id) {
			return {reason: 'Неправильные параметры для метода delete messageReaction'};
		}
		try {
			const isDeleted = await MessagesReactions.destroy({
				where: {message_id, user_id},
			});

			const data: TReactionResponse = {
				deleted: isDeleted,
				Message: await messageApi.get(message_id, user_id),
			};

			return {
				data,
			};
		} catch (e) {
			console.error(e);
			return {reason: 'Ошибка удаления строки в методе delete messageReaction'};
		}
	},
};