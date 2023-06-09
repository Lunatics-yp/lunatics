import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from '../sequelize';
import {Users} from './';

// Модель таблицы Forums
export type TForum = {
	id: number;
	name: string;
	user_id: number;
	created_at: Date;
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

const Forums = sequelize.define('Forums', forumModel, forumOptions);

Forums.belongsTo(Users, {foreignKey: 'user_id'});
Users.hasMany(Forums, {foreignKey: 'user_id'});

export {Forums};
