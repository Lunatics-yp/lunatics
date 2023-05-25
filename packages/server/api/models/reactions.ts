import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from 'server/api/sequelize';

// Модель таблицы Reactions
export type TReaction = {
	id: number;
	name: string;
	image: string;
};

const reactionOptions = {
	timestamps: false,
	tableName: 'Reactions',
};

const reactionModel: ModelAttributes<Model, TReaction> = {
	id: {
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	},
	image: {
		type: DataType.STRING,
		allowNull: false,
	},
};

const Reactions = sequelize.define('Reactions', reactionModel, reactionOptions);

export {Reactions};
