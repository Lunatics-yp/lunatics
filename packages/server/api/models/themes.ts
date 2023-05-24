import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';

// Модель таблицы Themes
type TTheme = {
	id: number;
	name: string;
};

const themeOptions = {
	timestamps: false,
	tableName: 'Themes',
};

const themeModel: ModelAttributes<Model, TTheme> = {
	id: {
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataType.STRING,
		unique: true,
	},
};

const Themes = sequelize.define('Themes', themeModel, themeOptions);

export {Themes};
