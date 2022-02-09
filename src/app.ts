
import dotenv from 'dotenv';
import Server from './models/server.model';

dotenv.config();

const server : Server = new Server();

export default server;
