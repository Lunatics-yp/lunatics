import {startServer} from './server';
import dotenv from 'dotenv';
dotenv.config();

const isDev = process.env.NODE_ENV === 'development';
const port = Number(process.env.SERVER_PORT) || 3001;

startServer(isDev, port);
