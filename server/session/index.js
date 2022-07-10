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
    effects: [],
};

const getNum = (list) => {
    let randomNum = Math.round(Math.random() * 13);
    return list.includes(randomNum) ? getNum(list) : randomNum;
};

class Session {
    constructor(storeData, io, CONFIG) {
        this.store = storeData;
        this.gameData = {};
        this.config = CONFIG;
        this.ticker = new Ticker(CONFIG);
        this.actions = new Actions(this.gameData, this.config);
    }
    start(cb) {
        const squotted = [];
        this.store.players.map(p => {
            const pos = getNum(squotted);
            squotted.push(pos)
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