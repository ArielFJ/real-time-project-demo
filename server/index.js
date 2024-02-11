import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initWebSocket } from './websocket.js';
import userController from './controllers/user.js';
import movieController from './controllers/movie.js';
import loggingService from './services/logging/index.js';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/users', userController);
app.use('/movies', movieController);

const server = createServer(app);

const socketIo = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

initWebSocket(socketIo);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(3001, () => {
    loggingService.log('WebSocket server listening on port 3001');
});