import {Sequelize} from 'sequelize-typescript';
import type {SequelizeOptions} from 'sequelize-typescript';
import dotenv from 'dotenv';
import {isDev} from '../utils/isDev';

// Читаем .env
dotenv.config();

// Стартуем Sequelize
const sequelizeOptions: SequelizeOptions = {
	host: process.env.POSTGRES_HOST || 'localhost',
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	dialect: 'postgres',
	logging: isDev ? console.log : false,
};

const sequelize = new Sequelize(sequelizeOptions);

// Подключение к БД
const dbConnect = () => new Promise((resolve) => {
	const connect = async () => {
		try {
			await sequelize.authenticate();
			await sequelize.sync();
			console.log('➜ 🎸 Connected to the Postgres DB');
			resolve(true);
		} catch (error) {
			console.error('Unable to connect to the database:', error);
			setTimeout(connect, 5000);
		}
	};
	connect();
});

export {sequelize, dbConnect};
