import {startServer} from './server';
import dotenv from 'dotenv';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';
const port = Number(process.env.SERVER_PORT);

startServer(isDev, port);
