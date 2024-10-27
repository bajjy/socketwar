import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import cors from 'cors';
import socketListener2 from './server/socketListener2.js';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4005;

const socketConfig = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    },
    transports: ['polling', 'websocket'],
};

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, './frontend')));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  
socketListener2(new Server(server, socketConfig));

process.on('uncaughtException', function(e){
    console.log(e);
});
