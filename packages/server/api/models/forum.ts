import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';
import {User} from './';

// Модель таблицы Forums
type TForum = {
	id: number;
	name: string;
	user_id: number;
	created_at?: Date;
};

const forumOptions = {
	timestamps: false,
	tableName: 'Forums',
};

const forumModel: ModelAttributes<Model, TForum> = {
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

const Forum = sequelize.define('Forum', forumModel, forumOptions);

Forum.belongsTo(User, {foreignKey: 'user_id'});

export {Forum};
