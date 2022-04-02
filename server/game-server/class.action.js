const multiIndex = (obj, is) => {  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
    return is.length ? multiIndex( obj[is[0]], is.slice(1) ) : obj
};

class Action {
    constructor() {
        this.game;
    }
    setGame(gg) {
        this.game = gg;
    }
    act(actions) {
        actions.map(ac => {
            let obj = multiIndex(this.game, ac.target);
            obj[ac.prop] = ac.value;
        })
    };
}

module.exports = Action;