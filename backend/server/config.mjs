export const CONFIG = {
    fps: 1000 / 60,
    speed: 0.025,//0.09,
    battlefieldSize: 15,
    hp: 100,
    spells: {
        move: {
            delivery: 5,
        },
        jump: {
            delivery: 3,
        },
        fireBallTarget: {
            damage: 10,
            source: 'fire',
            delivery: 1000, 
            targetDelivery: 30,
        },
    }
};