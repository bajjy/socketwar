
function socketInitNewGame(io) {
    if (name.length > 25) {
        const err = { error: 'name too long'};

        socket.emit('srverr', err );
        return ackFn( err );
    };
};

module.exports = socketListener;