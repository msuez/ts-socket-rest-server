
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketServer } from 'socket.io'

import Socket from './socket.model';
import {
    dbConnection
} from '../database/settings.database';

import authRoute from '../routes/auth.route';

class Server {

    private app: Application;
    private httpServer: HTTPServer;
    private io: SocketServer;
    private port: string;
    private api: any = {
        auth: `/api/auth`,
    }

    constructor() {
        
        this.app = express();
        this.httpServer = createServer( this.app );
        this.io = new SocketServer( this.httpServer );
        this.port = '8000' || '8000';
        
        this.middlewares();
        this.connectDB();
        this.connectSocket();
        this.routes();

    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( logger('dev') );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: false }) );
        this.app.use( cookieParser() );
        this.app.use( express.static('./src/public') );
    }

    connectDB() {
        dbConnection();
    }

    connectSocket() {
        new Socket( this.io );
    }

    routes() {
        this.app.use( this.api.auth, authRoute);
    }

    listen() {
        this.httpServer.listen(this.port, () => { 
            console.log(`Server on port: ${this.port}!`);
        });
    }

}

export default Server;