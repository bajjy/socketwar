const s4spellIndex = require('./s4spellIndex');
const fireBallTarget = require('./spells/fireBallTarget');
const { moveLeft, moveRight, jumpLeft, jumpRight } = require('./spells/moveJump');

let SPELL_INDEX = s4spellIndex();

function selfInvincibleStun(params) {

};

const spells = {
    list: {
        '2': moveLeft, //left
        '6': moveRight, //right
        '62': jumpLeft, //left
        '26': jumpRight, //right
        '167': selfInvincibleStun,
        '367': fireBallTarget,
    },
    cast(params) {
        const { arcanes } = params.me;
        const spell = arcanes.join('');
        const spellFunc = this.list[spell];

        if (!spellFunc) return { arcanes, error: 1, message: 'not exist' };

        SPELL_INDEX = s4spellIndex();
        return spellFunc(params);
    }
}

module.exports = spells;