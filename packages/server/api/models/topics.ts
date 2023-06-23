import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from '../sequelize';
import {Users, Forums} from './';

// Модель таблицы Topics
export type TTopic = {
	id: number;
	name: string;
	forum_id: number;
	user_id: number;
	created_at: Date;
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
	created_at: {
		type: DataType.DATE,
		allowNull: false,
		defaultValue: DataType.NOW,
	},
};

const topicOptions = {
	timestamps: false,
	tableName: 'Topics',
	indexes: [
		{
			unique: false,
			fields: ['forum_id'],
		},
	],
};

const Topics = sequelize.define('Topics', topicModel, topicOptions);

Topics.belongsTo(Forums, {foreignKey: 'forum_id'});
Forums.hasMany(Topics, {foreignKey: 'forum_id'});
Topics.belongsTo(Users, {foreignKey: 'user_id'});
Users.hasMany(Topics, {foreignKey: 'user_id'});

export {Topics};
