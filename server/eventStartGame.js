function startGame(params) {
    const { io, socket, gameServer, store } = params;
    const { players, link, room, owner } = store;
    const game = gameServer.initGame(link);

    console.log('START');

    io.in(room).emit('init-start-game-response', {
        room: link,
        scenes: game.scenes,
        started: game.started,
        speed: game.ticker.speed,
        time: game.ticker.time,
        clients: game.clients
    });

    game.ticker.run(() => {
        // for (let client in game.clients) {
        //     let cl = game.clients[client];
        // }
        io.in(room).emit('tick-game-response', {
            room: link,
            started: game.started,
            speed: game.ticker.speed,
            time: game.ticker.time,
            clients: game.clients,
            scenes: game.scenes,
            logic: {
                clients: game.logic.clients,
                currentMap: game.logic.currentMap
            },
            fx: game.fx.effects
        });
    });

    socket.on('tick-actions-update', actions => {
        game.action.act(actions);
    });
};

module.exports = startGame;