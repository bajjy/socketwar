const Ticker = require('./class.ticker');
const Actions = require('./class.actions');
const BATTLEFIELD_SIZE = require('../config').battlefieldSize;

const seedData = {
    x: 0,
    y: 0,
    width: 35,
    height: 35,
    pos: 0, //random free 0-16
    idle: true,
    arcanes: [],
    lastUsedArcanes: [],
    spells: [],
    effects: [],
    portrait: `/images/portrait/portrait${1 + Math.round(Math.random() * 22)}.png`,
    messages: ['start']
};

const getNum = (list) => {
    let randomNum = Math.round(Math.random() * BATTLEFIELD_SIZE);
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