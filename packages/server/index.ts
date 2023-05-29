import {startServer} from './server';
import dotenv from 'dotenv';
import {isDev} from './utils/isDev';

dotenv.config();

const port = Number(process.env.SERVER_PORT);

startServer(isDev, port);
