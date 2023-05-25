import {Messages} from 'server/api/models';
import type {TMessage} from 'server/api/models';
import type {TApiResponseData} from 'server/api/typing';

// Апи Топика
export const messageApi = {
	create: async (data: TMessage): Promise<TApiResponseData> => {
		const {text, topic_id, parent_message_id=0, user_id} = data;
		if(!text || !topic_id){
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
		if(!id || !text){
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
		if(!id){
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
};
