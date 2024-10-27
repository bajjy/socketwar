//const fps60 = 1000 / 60;

class Ticker {
    constructor(CONFIG) {
        this.config = CONFIG;
        this.cycle;
        this.speed = CONFIG.speed
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

export default Ticker