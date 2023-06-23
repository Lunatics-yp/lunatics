import {sequelizeToObject} from '../utils/sequelizeToObject';
import {Messages, Users, MessagesReactions} from '../models';
import type {TMessage} from '../models';
import type {TApiResponseData} from '../typing';
import type {TMessagesRespond} from './typing';

const messageInfoRequest = (user_id: number) => {
	return [
		{
			model: Users,
		},
		{
			model: MessagesReactions,
			attributes: [
				'reaction_id',
			],
			required: false,
		},
		{
			model: MessagesReactions,
			as: 'CurrentUserReaction',
			required: false,
			where: {user_id},
			limit: 1,
		},
	];
};

const messageWithCountedReactions = (message: TMessagesRespond[0]) => {
	if (message.MessagesReactions) {
		const reactions: number[] = [];
		message.MessagesReactions?.forEach(
			reaction => reactions.push(reaction.reaction_id));
		const result: Record<number, number> = {};
		reactions.forEach(reaction => {
			if (result[reaction] === undefined) {
				result[reaction] = 0;
			}
			result[reaction]++;
		});
		message.Reactions = result;
		delete message.MessagesReactions;

		// Тут избавляемся от массива и оставляем один объект
		message.UserReaction =
			message.CurrentUserReaction ? message.CurrentUserReaction[0] ?? {} : {};
		delete message.CurrentUserReaction;
	}
	return message;
};

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
			const messagesSQL = await Messages.findAll({
				where: {parent_message_id, topic_id},
				include: messageInfoRequest(user_id),
			});

			const messages = sequelizeToObject<TMessagesRespond>(messagesSQL);
			messages.map(message => messageWithCountedReactions(message));

			return {
				data: messages,
			};
		} catch (e) {
			console.error(e);
			return {reason: 'Ошибка при получении списка сообщений в методе list message'};
		}
	},
	get: async (message_id: number, user_id: number): Promise<object> => {
		try {
			const messageSQL = await Messages.findOne({
				where: {id: message_id},
				include: messageInfoRequest(user_id),
			});
			const message = sequelizeToObject<TMessagesRespond[0]>(messageSQL);
			return messageWithCountedReactions(message);
		} catch (e) {
			console.error(e);
			return {reason: 'Ошибка при получении сообщения в методе get message'};
		}
	},
};
