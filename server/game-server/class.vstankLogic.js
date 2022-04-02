const multiIndex = (obj, is) => {  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
    return is.length ? multiIndex( obj[is[0]], is.slice(1) ) : obj
};

const initNewClient = (logic, cl) => {
    logic.statistics[cl] = {
        kills: 0,
        deaths: 0
    };
    logic.clients[cl] = {
        deathControl: {
            disabled: false,
            switched: false,
            cd: 0,
            cdDur: 50
        },
        respawnControl: {
            respawning: false,
            switched: false
        }
    };
};
const respawnPoint = (gg, cl) => {
    let map = gg.logic.currentMap.map;
    let resp = map[ gg.logic.currentMap.settings.respawn[cl.team] ];

    gg.io.in(gg.room).emit('debug', {
        cl: cl,
        map: gg.logic.currentMap
    });

    cl.scene.scene.axis.y.translate = resp.axis.y.translate;
    cl.scene.scene.axis.x.translate = resp.axis.x.translate + Math.random() * ( resp.size.width);
};

class VstankLogic {
    constructor() {
        this.game;
        this.maps = {};
        this.currentMap;
        this.statistics = {};
        this.clients = {}
    };
    setGame(gg) {
        this.game = gg;
    };
    init() {
        this.setMap('level_1');
        
        this.game.started = true;
        this.game.eb.on('ticker-tick', () => this.loop.call(this) );
        return this.game
    };
    setMap(name) {
        this.currentMap = JSON.parse( JSON.stringify(this.game.maps.maps[name]) );
    };
    loop() {
        let game = this.game;

        for (let cl in game.clients) {
            let client = game.clients[cl];
            
            if (!this.clients[cl]) initNewClient(this, cl);
            this.deathControl(client);
            this.respawnControl(client);
        };
        this.mapEffectsControl();
        this.fxControl();
    };
    respawnControl(client) {
        let resp = this.clients[client.index].respawnControl;
        let dd = this.clients[client.index].deathControl;
        if (resp.switched && resp.respawning) {
            resp.switched = false;
            resp.respawning = false;
        }

        if (resp.switched) {
            
            resp.respawning = true;
            
            //TODO Put to respawn point from map and team of client  
            if (dd.cd == 0) respawnPoint(this.game, client);
        };

        if (dd.disabled && dd.switched && !resp.respawning) resp.switched = true;
    };
    deathControl(client) {
        let dd = this.clients[client.index].deathControl;
        if (client.unit.skills.death.death && !dd.switched) {
            dd.disabled = true;
            dd.switched = true;
            dd.cd = dd.cdDur;
        };
        if (dd.disabled && dd.switched) {
            if (dd.cd != 0) --dd.cd;
            if (dd.cd == 0) {
                dd.disabled = false;
                dd.switched = false;
            }
        };
    };
    mapEffectsControl() {
        //TODO cooldowns and respawns on currentMap cells
        // disable scene if it is destroyed
        const pushItemAll = (arr, value) => {
            if (arr.indexOf(value) > -1) return arr.indexOf(value);
            return arr.push(value) - 1;
        }
        
        this.currentMap.map.map(cell => {
            if (!cell.skills) return;
            let settings = cell.skills.death;
    
            if (settings.hp < 1) {

                //settings.cd = JSON.parse(JSON.stringify(settings.cdDur));
                //settings.hp = JSON.parse(JSON.stringify(settings.health));
                settings.death = true;
        
            }
            if (settings.death) pushItemAll(cell.css, 'death');
        
            //console.log()
        })
    };
    fxControl() {
        this.game.fx.effects.map((fx, i) => {
            if (fx.active) return this.game.fx.effects.splice(i, 1);
            fx.active = true;
        })
    }
}

module.exports = VstankLogic;