const multiIndex = (obj, is) => {  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
    return is.length ? multiIndex( obj[is[0]], is.slice(1) ) : obj
};

class Maps {
    constructor() {
        this.game;
        this.maps = {};
    }
    setGame(gg) {
        this.game = gg;
    }
    addMap(m) {
        this.maps[m.name] = m
    }
    act(actions) {
        actions.map(ac => {
            let obj = multiIndex(this.game, ac.target);
            obj[ac.prop] += ac.value
        })
    };
}

module.exports = Maps;