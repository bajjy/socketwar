const fps60 = 1000 / 60;

class Ticker {
    constructor() {
        this.cycle;
        this.speed = 1;
        this.time = 0;
        this.gg;
        this.eb;
    }
    setGame(gg) {
        this.gg = gg;
        this.eb = gg.eb;
    }
    run(func) {
        let eb = this.eb;
        let gg = this.gg;
        if (this.cycle) clearInterval(this.cycle);
        this.cycle = setInterval(() => {
            eb.emit('ticker-tick');
            func()
            ++this.time;
        }, fps60 / this.speed);
    };
}

module.exports = Ticker;