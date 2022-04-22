import * as express from 'express';
import * as http from 'http';
import { faker } from '@faker-js/faker';
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req: any, res: any) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: any) => {
    socket.on('new user', (username) => {
      username = username || faker.name.findName();
      console.log(`${username} joined the chat`);
      socket.name = username;
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', `${socket.name}: ${msg}`);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});