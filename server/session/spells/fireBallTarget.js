const s4spellIndex = require('../s4spellIndex');
let SPELL_INDEX = s4spellIndex();

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
        //Fireball should set target
        console.log('fireBall effect', 'target: ', spell.target);
        if (!spell.target) {
            spell.breaked = { by: 'you', message: 'target is not set' }
            return;
        }
    };
    return { 
        spellIndex: SPELL_INDEX, 
        ok: true, 
        name: 'fireBallTarget', 
        title: 'Fire Ball', 
        delivery: 10, 
        targetDelivery: 5,
        message: 'fire ball casted', 
        setTarget: true,
        target: false,
        effect,
        validation
    }
};

module.exports = fireBallTarget;