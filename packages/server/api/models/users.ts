import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';

// Модель таблицы Users
export type TUser = {
	id: number;
	login: string;
	nickname: string;
	avatar: string;
};

const userOptions = {
	timestamps: false,
	paranoid: false,
	tableName: 'Users',
};

const userModel: ModelAttributes<Model, TUser> = {
	id: {
		type: DataType.NUMBER,
		primaryKey: true,
		allowNull: false,
	},
	login: {
		type: DataType.STRING,
		allowNull: false,
	},
	nickname: {
		type: DataType.STRING,
	},
	avatar: {
		type: DataType.STRING,
	},
};

const Users = sequelize.define('Users', userModel, userOptions);

export {Users};
