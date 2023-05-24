import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';
import {Users, Messages, Reactions} from './';

// Модель таблицы MessagesReactions
type TMessageReaction = {
	message_id: number;
	user_id: number;
	reaction_id: number;
};

const messageReactionOptions = {
	timestamps: false,
	tableName: 'MessagesReactions',
};

const messageReactionModel: ModelAttributes<Model, TMessageReaction> = {
	message_id: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: Messages,
			key: 'id',
		},
	},
	user_id: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: Users,
			key: 'id',
		},
	},
	reaction_id: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: Reactions,
			key: 'id',
		},
	},
};

const MessagesReactions = sequelize.define(
	'MessagesReactions',
	messageReactionModel,
	messageReactionOptions,
);

export {MessagesReactions};
