import {Sequelize} from 'sequelize-typescript';
import type {SequelizeOptions} from 'sequelize-typescript';
import dotenv from 'dotenv';

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

// Подключение к БД
const dbConnect = async () => {
	try {
		await sequelize.authenticate(); // Проверка аутентификации в БД
		await sequelize.sync(); // Синхронизация базы данных
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

export {sequelize, dbConnect};
