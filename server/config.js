module.exports = {
    fps: 1000 / 60,
    speed: 1,//0.09,
    battlefieldSize: 16,
    hp: 100,
    spells: {
        fireBallTarget: {
            damage: 10,
            source: 'fire',
            delivery: 1000, 
            targetDelivery: 30,
        }
    }
};