const multiIndex = (obj, is) => {  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
    return is.length ? multiIndex( obj[is[0]], is.slice(1) ) : obj
};

class Fx {
    constructor() {
        this.effects = []
    }
    addFx(data) {
        let newFx = {
            cdDur: 0,
            cd: 0,
            fxLifetime: 0,
            active: false,
            css: [],
            width: 0,
            height: 0,
            depth: 0,
            x: 0,
            y: 0,
            z: 0
        };

        for (let k in data) {
            newFx[k] = data[k];
            if (k == 'css') newFx[k].push('fx-container');
        };
        
        return this.effects.push(newFx) - 1
    }
}

module.exports = Fx;