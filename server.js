const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const requestListener = require('./server/requestListener');
const socketListener = require('./server/socketListener');

const PORT = 4000;
const HTML = path.join(__dirname, 'dist');
const GAMESERVER = path.join(__dirname, 'game-server');

const config = {
    html: HTML,
    gameserver: GAMESERVER,
};
const socketConfig = {
    transports: ['polling', 'websocket'],
};
const app = http.createServer((request, response) => requestListener({ request, response, config })).listen(PORT);
socketListener(socketio(app, socketConfig));

process.on('uncaughtException', function(e){
    console.log(e);
});

