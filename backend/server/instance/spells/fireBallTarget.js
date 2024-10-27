const s4spellIndex = require('../s4spellIndex');
const CONFIG = require('../../config');

let SPELL_INDEX = s4spellIndex();
const NAME = 'fireBallTarget';
function fireBallTarget(params) {
    const validation = (validationParams) => {
        const {
            gameData,
            me,
            act,
            spell,
        } = params;
        const targetPos = act.target;

        if (me.pos == targetPos) {
            return false;
        }
        return true;
    };
    const effect = (relevantParams) => {
        const { player, gameData, spell, config } = relevantParams;
        const me = gameData[player];
        const targets = Object.keys(gameData).filter(targ => gameData[targ].pos === spell.target);

        targets.map(target => 
            gameData[target].effects.push({
                causedBy: player,
                target: target,
                effType: 'damage',
                damage: config.spells[NAME].damage,
                source: config.spells[NAME].source,
                spell: spell,
                finished: false
            })
        );

        //Fireball should set target
        console.log('fireBall effect', 'target: ', spell.target);
        if (typeof spell.target !== 'number') {
            spell.breaked = { by: 'you', message: 'target is not set' }
            return;
        }
    };
    return { 
        spellIndex: SPELL_INDEX, 
        ok: true, 
        name: NAME, 
        title: 'Fire Ball', 
        delivery: CONFIG.spells[NAME].delivery, 
        targetDelivery: CONFIG.spells[NAME].targetDelivery,
        message: 'fire ball casted', 
        setTarget: true,
        target: false,
        effect,
        validation
    }
};

module.exports = fireBallTarget;