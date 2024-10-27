import Session from './session/index.js';
import { CONFIG } from './config.mjs' 

const SINGLE_SESSION_NAME = 'single-session';
const stash = {};

const setLink = (io) => {
    const link = SINGLE_SESSION_NAME; // All players connect to the same session
    if (!stash[link]) {
        stash[link] = {
            room: link,
            players: [], // Ensure players array is initialized
            game: new Session(stash[link], io, CONFIG) // Initialize the game session here
        };
    }
    return stash[link];
};

const startGame = (io) => {
    const store = setLink(io); // Pass io to setLink

    // Start the game immediately
    store.game.start(() => {
        io.in(store.room).emit('new-game-response', {
            config: {
                fps: CONFIG.fps,
                speed: CONFIG.speed,
                battlefieldSize: CONFIG.battlefieldSize,
            }
        });
        store.players.map(pl => store.game.checkActions(pl.socket));
        io.in(store.room).emit('ticker-tick', { data: store.game.gameData });
    });
};

function socketListener2(io) {
    // Initialize the game when the server starts
    startGame(io);

    io.on('connection', (socket) => {
        console.log('Player connected:', socket.id);
        const store = stash[SINGLE_SESSION_NAME];

        socket.on('join-request', (name, response) => {
            if (store.players.find(player => player.name === name)) {
                return response({ error: 'Player already exists!' });
            }

            console.log('New player:', name);
            socket.join(store.room);
            const newPlayer = {
                name: name,
                socket: socket.id
            };
            store.players.push(newPlayer);

            // Add the new player to the game session
            store.game.addPlayer(newPlayer);

            response({
                role: 'player',
                name: name,
                link: store.room,
                socket: socket.id,
                config: {
                    fps: CONFIG.fps,
                    speed: CONFIG.speed,
                    battlefieldSize: CONFIG.battlefieldSize,
                }
            });

            io.in(store.room).emit('player-update', store.players);
        });

        socket.on('reconnect-player', (name, response) => {
            const player = store.players.find(p => p.name === name);
            if (!player) {
                return response({ error: 'Player not found!' });
            }

            player.socket = socket.id; // Update the socket ID for the player
            console.log('Player reconnected:', name);
            response({ success: true });
            io.in(store.room).emit('player-update', store.players);
        });

        socket.on('ticker-tick-request', (actions) => {
            store.game.updateActions(socket.id, actions);
        });

        socket.on('disconnect', () => {
            console.log('Player disconnected:', socket.id);
            const playerIndex = store.players.findIndex(player => player.socket === socket.id);
            if (playerIndex !== -1) {
                store.players.splice(playerIndex, 1);
                io.in(store.room).emit('player-update', store.players);
            }
        });
    });
}

export default socketListener2