import Ticker from './class.ticker.js'
import Actions from './class.actions.js'
import { CONFIG } from '../config.mjs'

const BATTLEFIELD_SIZE = CONFIG.battlefieldSize;

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

    addPlayer(player) {
        const pos = this.getAvailablePosition();
        this.gameData[player.socket] = JSON.parse(JSON.stringify({ ...seedData, meta: player }));
        this.gameData[player.socket].pos = pos;
        this.gameData[player.socket].baseHealth = this.config.hp;
        this.gameData[player.socket].actualHealth = this.config.hp;
        this.gameData[player.socket].affectedHealth = this.config.hp;
    }

    getAvailablePosition() {
        const occupiedPositions = Object.values(this.gameData).map(player => player.pos);
        return getNum(occupiedPositions);
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

export default Session