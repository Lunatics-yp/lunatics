import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';
import {User, Forum} from './';

// Модель таблицы Topics
type TTopic = {
	id: number;
	name: string;
	forum_id: number;
	user_id: number;
	created_at?: Date;
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
			model: Forum,
			key: 'id',
		},
	},
	user_id: {
		type: DataType.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id',
		},
	},
	created_at: {
		type: DataType.DATE,
		defaultValue: DataType.NOW,
	},
};

const Topic = sequelize.define('Topic', topicModel, topicOptions);

Topic.belongsTo(Forum, {foreignKey: 'forum_id'});
Topic.belongsTo(User, {foreignKey: 'user_id'});

export {Topic};
