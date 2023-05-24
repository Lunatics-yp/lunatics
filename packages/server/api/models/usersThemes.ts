import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';
import {Users, Themes} from './';

// Модель таблицы UsersThemes
type TUsersThemes = {
	user_id: number;
	theme_id?: number;
};

const usersThemesOptions = {
	timestamps: false,
	tableName: 'UsersThemes',
};

const usersThemesModel: ModelAttributes<Model, TUsersThemes> = {
	user_id: {
		type: DataType.INTEGER,
		primaryKey: true,
		allowNull: false,
		references: {
			model: Users, // Связь с моделью User
			key: 'id',
		},
	},
	theme_id: {
		type: DataType.INTEGER,
		references: {
			model: Themes, // Связь с моделью Theme
			key: 'id',
		},
	},
};

const UsersThemes = sequelize.define('UsersThemes', usersThemesModel, usersThemesOptions);

UsersThemes.belongsTo(Users, {foreignKey: 'user_id'});
UsersThemes.belongsTo(Themes, {foreignKey: 'theme_id'});

export {UsersThemes};
