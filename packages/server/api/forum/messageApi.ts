import {Messages, Users, MessagesReactions} from '../models';
import type {TMessage} from '../models';
import type {TApiResponseData} from '../typing';
import {sequelize} from '../sequelize';

// Апи Топика
export const messageApi = {
	create: async (data: TMessage): Promise<TApiResponseData> => {
		const {text, topic_id, parent_message_id = 0, user_id} = data;
		if (!text || !topic_id) {
			return {reason: 'Неправильные параметры для метода create message'};
		}
		try {
			const newMessage = await Messages.create({
				text,
				topic_id,
				parent_message_id,
				user_id,
			});
			return {
				data: newMessage,
			};
		} catch (e) {
			return {reason: 'Ошибка при создании строки в методе create message'};
		}
	},
	edit: async (data: TMessage): Promise<TApiResponseData> => {
		const {id, text, user_id} = data;
		if (!id || !text) {
			return {reason: 'Неправильные параметры для метода rename message'};
		}
		try {
			await Messages.update(
				{text},
				{where: {id, user_id}},
			);
			const updatedMessage = await Messages.findOne({where: {id}});
			return {
				data: updatedMessage as object,
			};
		} catch (e) {
			return {reason: 'Ошибка при изменении строки в методе rename message'};
		}
	},
	delete: async (data: TMessage): Promise<TApiResponseData> => {
		const {id, user_id} = data;
		if (!id) {
			return {reason: 'Неправильные параметры для метода delete message'};
		}
		try {
			const isDeleted = await Messages.destroy({
				where: {id, user_id},
			});
			return {
				data: {deleted: isDeleted},
			};
		} catch (e) {
			return {reason: 'Ошибка удаления строки в методе delete message'};
		}
	},
	list: async (data: TMessage): Promise<TApiResponseData> => {
		const {parent_message_id = 0, topic_id, user_id} = data;
		if (!topic_id) {
			return {reason: 'Неправильные параметры для метода lest message'};
		}
		try {
			const messages = await Messages.findAll({
				where: {parent_message_id, topic_id},
				include: [
					{
						model: Users,
						as: 'user',
					},
					{
						model: MessagesReactions,
						as: 'reactions',
						attributes: [
							'reaction_id',
							[sequelize.literal('COUNT(*)'), 'count'],
						],
					},
					{
						model: MessagesReactions,
						as: 'user_reaction',
						attributes: [],
						where: {user_id},
						required: false,
					},
				],
				group: ['Messages.id', 'reactions.reaction_id'],
				order: [['id', 'ASC']],
			});
			return {
				data: messages,
			};
		} catch (e) {
			return {reason: 'Ошибка при получении списка топиков в методе list topic'};
		}
	},
};
