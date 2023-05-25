import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';
import {Users, Forums} from './';

// Модель таблицы Topics
export type TTopic = {
	id: number;
	name: string;
	forum_id: number;
	user_id: number;
	created_at: Date;
};

const topicOptions = {
	timestamps: false,
	tableName: 'Topics',
};

const topicModel: ModelAttributes<Model, TTopic> = {
	id: {
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataType.STRING,
		allowNull: false,
	},
	forum_id: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: Forums,
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
	created_at: {
		type: DataType.DATE,
		allowNull: false,
		defaultValue: DataType.NOW,
	},
};

const Topics = sequelize.define('Topics', topicModel, topicOptions);

Topics.belongsTo(Forums, {foreignKey: 'forum_id'});
Topics.belongsTo(Users, {foreignKey: 'user_id'});

export {Topics};
