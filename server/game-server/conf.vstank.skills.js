const skills = {
    moving: {
        speeed: 0,
        anglee: 0,
        sideee: 0,
        friction: 0.85,//0.75,
        acc: 1,
        up: 0,
        down: 0,
        left: 0,
        right: 0
    },
    fire: {
        fireBox: false,
        fire: 0,
        range: 500,
        rangeReserve: 500,
        speed: 0,
        angle: 0,
        side: 0,
        acc: 4,
        power: 100,
        areaOfEffectEnv: [10, 20, 10],
        areaOfEffect: [1, 1, 1],
        cd: 0,
        cdDur: 50,
        state: {
            fireBox: false,
            fire: 0,
            range: 500,
            rangeReserve: 500,
            speed: 0,
            angle: 0,
            side: 0,
            acc: 4,
            power: 100,
            areaOfEffectEnv: [10, 20, 10],
            areaOfEffect: [1, 1, 1],
            cd: 0,
            cdDur: 50,
        },
        instances: []
    },
    death: {
        death: false,
        hp: 100,
        health: 100,
        cd: 0,
        cdDur: 50
    }
};

module.exports = {
    skills
}