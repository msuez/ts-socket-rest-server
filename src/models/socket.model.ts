
import { Server } from 'socket.io';

class Socket {

    private io: Server;

    constructor( io: Server ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', ( socket ) => {            
            console.log( `Client connected!` );
        });
    }

}

export default Socket;