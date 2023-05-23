import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';

// Модель User
type TUser = {
	id: number;
	login: string;
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
};

const User = sequelize.define('User', userModel, userOptions);

export {User};
