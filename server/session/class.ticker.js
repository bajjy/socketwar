const fps60 = 1000 / 60;

class Ticker {
    constructor() {
        this.cycle;
        this.speed = 0.016;
        this.time = 0;
    }
    run(callback) {
        if (this.cycle) clearInterval(this.cycle);
        this.cycle = setInterval(() => {
            callback()
            ++this.time;
        }, fps60 / this.speed);
        // }, 1000);
    };
}

module.exports = Ticker;