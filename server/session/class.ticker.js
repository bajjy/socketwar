//const fps60 = 1000 / 60;

class Ticker {
    constructor(CONFIG) {
        this.config = CONFIG;
        this.cycle;
        this.speed = CONFIG.speed//0.1//0.016;
        this.time = 0;
    }
    run(callback) {
        if (this.cycle) clearInterval(this.cycle);
        this.cycle = setInterval(() => {
            callback()
            ++this.time;
        }, this.config.fps / this.speed);
        // }, 1000);
    };
}

module.exports = Ticker;