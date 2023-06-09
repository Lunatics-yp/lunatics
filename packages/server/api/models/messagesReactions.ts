import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from '../sequelize';
import {Users, Messages} from './';

// Модель таблицы MessagesReactions
export type TMessageReaction = {
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
		onDelete: 'CASCADE',
	},
	user_id: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: Users,
			key: 'id',
		},
		onDelete: 'CASCADE',
	},
	reaction_id: {
		type: DataType.INTEGER,
		allowNull: false,
	},
};

const MessagesReactions = sequelize.define(
	'MessagesReactions',
	messageReactionModel,
	messageReactionOptions,
);

MessagesReactions.belongsTo(Users, {foreignKey: 'user_id'});
Users.hasMany(MessagesReactions, {foreignKey: 'user_id'});
MessagesReactions.belongsTo(Messages, {foreignKey: 'message_id'});
Messages.hasOne(MessagesReactions, {foreignKey: 'message_id'});

export {MessagesReactions};
