const Ticker = require('./class.ticker');
const Actions = require('./class.actions');

const seedData = {
    x: 0,
    y: 0,
    width: 35,
    height: 35,
    pos: 0, //random free 0-13
    idle: true,
    arcanes: [],
    lastUsedArcanes: [],
    spells: [],
    effects: []
};

const getNum = (list) => {
    let randomNum = Math.round(Math.random() * 13);
    return list.includes(randomNum) ? getNum(list) : randomNum;
};

class Session {
    constructor(storeData, io) {
        this.store = storeData;
        this.gameData = {};
        this.ticker = new Ticker();
        this.actions = new Actions(this.gameData);
    }
    start(cb) {
        const squotted = [];
        this.store.players.map(p => {
            const pos = getNum(squotted);
            this.gameData[p.socket] = JSON.parse( JSON.stringify({ ...seedData, meta: p }) );
            this.gameData[p.socket].pos = pos;
        });
        this.ticker.run(cb);
    }
    updateActions(player, action) {
        console.log('new action =====> ', action);
        if (!action.length) return;
        this.actions.setAction(player, action);
    }
    checkActions(player) {
        this.actions.checkAction(player);
    }
}

module.exports = Session;