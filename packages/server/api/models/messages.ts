import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';
import {Users, Topics} from './';

// Модель таблицы Messages
export type TMessage = {
	id: number;
	user_id: number;
	text: string;
	topic_id: number;
	parent_message_id?: number;
	created_at?: Date;
};

const messageOptions = {
	timestamps: false,
	tableName: 'Messages',
};

const messageModel: ModelAttributes<Model, TMessage> = {
	id: {
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	user_id: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: Users,
			key: 'id',
		},
	},
	text: {
		type: DataType.TEXT,
		allowNull: false,
	},
	topic_id: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: Topics,
			key: 'id',
		},
	},
	parent_message_id: {
		type: DataType.INTEGER,
		references: {
			model: 'Messages',
			key: 'id',
		},
	},
	created_at: {
		type: DataType.DATE,
		defaultValue: DataType.NOW,
	},
};

const Messages = sequelize.define('Messages', messageModel, messageOptions);

Messages.belongsTo(Topics, {foreignKey: 'topic_id'});
Messages.belongsTo(Users, {foreignKey: 'user_id'});
Messages.belongsTo(Messages, {foreignKey: 'parent_message_id', as: 'parentMessage'});

export {Messages};
