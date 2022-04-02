const moving = require('./skill.moving.js');
const fire = require('./skill.fire.js');
const death = require('./skill.death.js');

const config = {
    moving,
    fire,
    death
};

class Skills {
    constructor() {
        this.game;
        this.skills = [];
    }
    sett(skill, args) {
        return this.skills.push(() => {
            config[skill](...args)
        }) - 1;
    }
    setGame(gg) {
        this.game = gg;
    }
    run(index) {
        this.game.eb.on('ticker-tick', this.skills[index] );
    }
    stop(index) {
        this.game.eb.off('ticker-tick', this.skills[index] );
    }
};

module.exports = Skills;