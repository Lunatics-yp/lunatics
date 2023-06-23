import {DataType, Model} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import {sequelize} from '../sequelize';
import {Users} from './';

// Модель таблицы Leaderboard
export type TLeaderboard = {
	id: number;
	user_id: number;
	wins: number;
	games: number;
};

const leaderboardModel: ModelAttributes<Model, TLeaderboard> = {
	id: {
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
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
	wins: {
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	games: {
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
};

const leaderboardOptions = {
	timestamps: false,
	paranoid: false,
	tableName: 'Leaderboard',
	indexes: [
		{
			unique: true,
			fields: ['user_id'],
		},
	],
	autoIncrement: true,
};

const Leaderboard = sequelize.define('Leaderboard', leaderboardModel, leaderboardOptions);

Leaderboard.belongsTo(Users, {foreignKey: 'user_id'});
Users.hasOne(Leaderboard, {foreignKey: 'user_id'});

export {Leaderboard};
