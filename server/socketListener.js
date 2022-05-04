const Session = require('./session');
const stash = {};

const getByOwner = (owner) => Object.keys(stash).find(key => stash[key].owner === owner);
const getByPlayer = (name, link) => {
    stash[link].players.find(player => player.name === name)
};
const getLinkBySocket = (socket) => {
    let player;
    const link = Object.keys(stash).find(link => {
        player = stash[link].players.find(player => player.socket === socket);
        return player;
    });
    return [stash[link], player];
};
const getTeams = (players) => [
    players.filter(p => !p.team).map((p) => p),
    players.filter(p => p.team === 1).map((p) => p),
    players.filter(p => p.team === 2).map((p) => p),
];
const getLink = (link) => stash[link];
const setLink = (owner, socket) => {
    const link = s4();
    const room = s4();

    stash[link] = {
        socket,
        link,
        room,
        owner,
        game: '',
        players: []
    }
    return stash[link];
};
const removeBySoket = (id) => {
    const link = Object.keys(stash).find(key => stash[key].socket === id);
    if (link) {
        const childSockets = stash[link].players.map(pl => pl.socket);
        console.log('childSockets');
        console.log(childSockets);
        return delete stash[link]
    };
    Object.keys(stash).some(link => {
        const index = stash[link].players.findIndex(player => player.socket === id);
        stash[link].players.splice(index, 1);
        
        return index > -1;
    });
};

const s4 = () => {
    var r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return r() + r();
};

function socketListener(io) {
    io.on('connection', (socket) => {
        console.log(io.engine.clientsCount)
        console.log('socket')

        socket.on('create-request', (ownerName, response) => {
            if (getByOwner(ownerName)) return console.log('Already exsit: ' + ownerName);
            const store = setLink(ownerName, socket.id);

            console.log('new owner: ' + ownerName);
            socket.join(store.room);
            store.players.push({
                name: ownerName,
                team: false,
                socket: socket.id
            });
            response({
                role: 'owner',
                name: ownerName,
                link: store.link
            });
        });
        socket.on('join-request', ({ name, link }, response) => {
            const store = getLink(link);

            if (getByPlayer(name, link)) console.log('PLAYER exsit: ' + name);
            
            console.log('new player: ' + name);
            socket.join(store.room);
            store.players.push({
                name: name,
                team: false,
                socket: socket.id
            });

            io.in(store.room).emit('get-teams-response', getTeams(store.players));
            response({
                role: 'player',
                name: name,
                link: store.link
            })
        });
        socket.on('get-teams', () => {
            const { players } = getLinkBySocket(socket.id)[0];

            io.to(socket.id).emit('get-teams-response', getTeams(players));
        });
        socket.on('update-teams', (team) => {
            const [{ players, room }, player] = getLinkBySocket(socket.id);
            player.team = team;
            
            io.in(room).emit('get-teams-response', getTeams(players));
        });
        socket.on('new-game', () => {
            const [store, player] = getLinkBySocket(socket.id);
            const { players, link, room, owner } = store;

            if (player.name !== owner) {
                socket.emit('server-error', {error: 'Not allowed!'} );
            }

            store.game = new Session(store, io);
            io.in(room).emit('new-game-response');
        });
        socket.on('start-game', () => {
            const [store, player] = getLinkBySocket(socket.id);

            store.game.start(() => {
                store.players.map(pl => store.game.checkActions(pl.socket));

                io.in(store.room).emit('ticker-tick', { data: store.game.gameData });
            });
        });
        socket.on('ticker-tick-request', (actions) => {
            const [store] = getLinkBySocket(socket.id);
            
            //checkup actions if valid
            store.game.updateActions(socket.id, actions);
        });

        socket.once('disconnect', () => {
            //check socket and room before remove
            //removes wrong player and brake pipe
            
            //const link = removeBySoket(socket.id);
            //socket.emit('owner-disconnected')
            //socket.emit('player-disconnected')
            console.log('DISCONNECTED', socket.id);
        });
    });
};

module.exports = socketListener;