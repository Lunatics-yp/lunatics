import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import {DataType, Model, Table, Column} from 'sequelize-typescript';
import type {ModelAttributes} from 'sequelize/types';
import type {Request, Response} from 'express';
import dotenv from 'dotenv';
import type {TPostData} from 'server/api/typing';

// Читаем .env
dotenv.config();

// Стартуем Sequelize
const sequelizeOptions: SequelizeOptions = {
	host: 'localhost',
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	dialect: 'postgres',
	logging: true, // Вести лог запросов к БД в консоль
};

const sequelize = new Sequelize(sequelizeOptions);

// Модель User
type IUser = {
	id: number;
	login: string;
};

const userOptions = {
	timestamps: false,
	paranoid: false,
	tableName: 'Users',
};

const userModel: ModelAttributes<Model, IUser> = {
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

// Подключение к БД
async function dbConnect() {
	try {
		await sequelize.authenticate(); // Проверка аутентификации в БД
		await sequelize.sync(); // Синхронизация базы данных
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

// Проверка валидности пост-запроса
const isValidPostData = (data: any): data is TPostData => {
	if (data === null || typeof data !== 'object') {
		return false;
	}
	const {action} = data;
	if (typeof action !== 'string') {
		return false;
	}
	return true;
};

// Апи Форума
export const forumApi = (req: Request, res: Response): void => {
	// const postData = req.body as TPostData;
	// if (isValidPostData(postData)) {
	// тело апи будет тут
	// }else{
	// 	res.status(400).json({error: 'Неправильный запрос'});
	// }

	dbConnect()
		.then(async () => {
			const users = await User.findAll();
			res.json(users);
		});
};
