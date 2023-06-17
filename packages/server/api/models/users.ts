import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from '../sequelize';

// Модель таблицы Users
export type TUser = {
	id: number;
	login: string;
	display_name: string;
	avatar: string;
};

const userModel: ModelAttributes<Model, TUser> = {
	id: {
		type: DataType.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	login: {
		type: DataType.STRING,
		allowNull: false,
	},
	display_name: {
		type: DataType.STRING,
	},
	avatar: {
		type: DataType.STRING,
	},
};

const userOptions = {
	timestamps: false,
	paranoid: false,
	tableName: 'Users',
};

const Users = sequelize.define('Users', userModel, userOptions);

export {Users};
