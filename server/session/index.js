const Ticker = require('./class.ticker');
const Actions = require('./class.actions');
const seedData = {
    x: 0,
    y: 0,
    width: 100,
    height: 70
};

class Session {
    constructor(storeData, io) {
        this.store = storeData;
        this.gameData = {};
        this.ticker = new Ticker();
        this.actions = new Actions(this.gameData);
    }
    start(cb) {
        this.store.players.map(p => {
            this.gameData[p.socket] = JSON.parse( JSON.stringify({ ...seedData, meta: p }) );
        });
        this.ticker.run(cb);
    }
    updateActions(player, action) {
        if (!action.length) return;
        this.actions.setAction(player, action);
    }
}

module.exports = Session;