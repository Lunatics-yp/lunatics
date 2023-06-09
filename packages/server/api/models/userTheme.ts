import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from '../sequelize';
import {Users} from './users';

// Модель таблицы UsersThemes
type TUserTheme = {
	user_id: number;
	theme_name?: string;
};

const userThemeOptions = {
	timestamps: false,
	tableName: 'UserTheme',
};

const userThemeModel: ModelAttributes<Model, TUserTheme> = {
	user_id: {
		type: DataType.INTEGER,
		primaryKey: true,
		allowNull: false,
		references: {
			model: Users, // Связь с моделью User
			key: 'id',
		},
	},
	theme_name: {
		type: DataType.STRING,
	},
};

const UserTheme = sequelize.define('UserTheme', userThemeModel, userThemeOptions);

UserTheme.belongsTo(Users, {foreignKey: 'user_id'});
Users.hasOne(UserTheme, {foreignKey: 'user_id'});

export {UserTheme};
