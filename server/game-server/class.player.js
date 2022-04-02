const config = require('./conf.vstank.skills.js').skills;

function s4() {
    var r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return r() + r();
};

class Player {
    constructor(index, name) {
        this.index = index;
        this.name = name || index;

    }
    aunit(name, data) {
        let unit;
        let index = s4();
        let skills = data.skills || [];

        unit = {};
        unit['index'] = index;
        unit['name'] = name;
        unit['parent'] = this.index;
        unit['skills'] = {};

        skills.map(sk => {
            unit.skills[sk] = config[sk] ? JSON.parse( JSON.stringify(config[sk]) ) : {};
        });
        return unit
    };
    
}

module.exports = Player;