const Player = require('./class.player.js');
const Eb = require('./class.eb.js');
const Ticker = require('./class.ticker.js');
const Action = require('./class.action.js');
const Skills = require('./class.skills.js');
const Maps = require('./class.maps.js');
const VstankLogic = require('./class.vstankLogic.js');
const Fx = require('./class.fx.js');
const { Scene } = require('./class.scenecast.js');
const { Collision } = require('./class.scenecast.js');

const level_1 = require('./map.level_1.js');
const vstank = require('./conf.vstank.js');

var games;
var step = 100;

function s4() {
    var r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return r() + r();
};
function configureTank(sc, cl) {
    
    sc.scene.size.width = JSON.parse(JSON.stringify( vstank.graphics.box.width ));
    sc.scene.size.height = JSON.parse(JSON.stringify( vstank.graphics.box.height ));
    sc.scene.size.depth = JSON.parse(JSON.stringify( vstank.graphics.box.depth ));

    sc.scene.css = Object.assign([], [...vstank.graphics.css, `team-${cl.team}`]);
    sc.scene.asset = JSON.parse(JSON.stringify( vstank.assets.tank.html ));
    sc.scene.assetSize = JSON.parse(JSON.stringify( vstank.assets.tank.assetSize ));
};

function configurePlayer(cl, pl, sc, game) {
    cl['player'] = pl.player;
    cl['unit'] = pl.unit;
    cl['unit']['team'] = cl.team;
    cl['scene'] = sc;
    cl['scene'].scene['team'] = cl.team;
    cl['scene'].scene['parent'] = cl.index;

    cl['scene'].scene.axis.y.translate = step;
    step += 90;

    let movingIndex = game.skills.sett('moving', [cl.unit, cl.scene, game]);
    let fireIndex = game.skills.sett('fire', [cl.unit, cl.scene, game]);
    let deathIndex = game.skills.sett('death', [cl.unit, cl.scene, game]);
    
    game.skills.run(movingIndex);//index of skill
    game.skills.run(fireIndex);//index of skill
    game.skills.run(deathIndex);//index of skill
};

class GameServer {
    constructor() {
        this.games = {};
        this.teams = ['a', 'b'];
    }
    destroyGame(room) {
        console.log(room + ' has been DESTROYED')
        this.games[room].started = false;
        clearInterval(this.games[room].ticker.cycle);
        delete this.games[room];
    }
    newGame(io, name) {
        let index = name//`${s4()}-${s4()}-${s4()}`;
        if (this.games[index]) this.destroyGame(index);
        this.games[index] = {
            io: io,
            room: index,
            clients: {},
            scenes: {},
            started: false,
            eb: new Eb(),
            ticker: new Ticker(),
            action: new Action(),
            skills: new Skills(),
            maps: new Maps(),
            collision: new Collision(),
            logic: new VstankLogic(),
            fx: new Fx()
        };
        this.games[index].ticker.setGame(this.games[index]);
        this.games[index].action.setGame(this.games[index]);
        this.games[index].skills.setGame(this.games[index]);
        this.games[index].maps.setGame(this.games[index]);
        this.games[index].collision.setGame(this.games[index]);
        this.games[index].logic.setGame(this.games[index]);
        
        this.games[index].maps.addMap(level_1)
        
        return index
    }
    joinGame({room, team}) {
        let clientIndex = s4();
        let game = this.games[room];

        if (!game) return false;
        
        game.clients[clientIndex] = {
            index: clientIndex,
            ready: true,
            team
        };

        if (game.started) {
            let cl = game.clients[clientIndex];
            let pl = this.createPlayer(cl.index);
            let sc = this.createBox(room, cl.index);

            configureTank(sc, cl)
            configurePlayer(cl, pl, sc, game)
        }
        return clientIndex
    }
    createBox(room, clientIndex) {
        let game = this.games[room];
        let scene = new Scene(clientIndex);

        game.scenes[scene.index] = scene;
        return {
            scene
        }
    }
    createPlayer(index) {
        let player = new Player(index);

        let unit = player.aunit('tank1', {
            skills: ['moving', 'fire', 'death', 'stun', 'sheild'],
        });

        return {
            player,
            unit
        }
    }
    getGame(room) {
        return this.games[room];
    }
    initGame(room) {
        let game = this.getGame(room);
        
        for (let client in game.clients) {
            let cl = game.clients[client];
            let pl = this.createPlayer(cl.index);
            let sc = this.createBox(room, cl.index);

            configureTank(sc, cl);
            configurePlayer(cl, pl, sc, game);
        };
        game.logic.init();
        return game
    }
}

module.exports = GameServer