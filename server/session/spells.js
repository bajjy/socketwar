const s4spellIndex = require('./s4spellIndex');
const fireBallTarget = require('./spells/fireBallTarget');

let SPELL_INDEX = s4spellIndex();

function moveLeft(params) {
    const effect = (relevantParams) => {
        const { player, gameData, spell, config } = relevantParams;
        const me = gameData[player];
        const POS_MAX = config.battlefieldSize; // 0 - 16 total positions = 17
        const targetPos = me.pos - 1 < 0 ? POS_MAX : me.pos - 1;

        //check players positions
        Object.keys(gameData).filter(pl => pl !== player).map(key => {
            // Object.keys(gameData).map(key => {
            if (gameData[key].pos === targetPos) {
                // if (gameData[key].pos) {
                spell.breaked = { by: key, message: 'FAIL' }
            }
        });
        if (!spell.breaked) me.pos = me.pos - 1 < 0 ? POS_MAX : --me.pos;
    };
    return { spellIndex: SPELL_INDEX, ok: true, name: 'moveLeft', title: 'Move left', delivery: 5, message: 'moved left', effect }
};
function moveRight(params) {
    const effect = (relevantParams) => {
        const { player, gameData, spell, config } = relevantParams;
        const me = gameData[player];
        const POS_MAX = config.battlefieldSize; // 0 - 16 total positions = 17
        const targetPos = me.pos + 1 > POS_MAX ? 0 : me.pos + 1;

        Object.keys(gameData).filter(pl => pl !== player).map(key => {
            // Object.keys(gameData).map(key => {
            if (gameData[key].pos === targetPos) {
                // if (gameData[key].pos) {
                spell.breaked = { by: key, message: 'FAIL' }
            }
        });
        if (!spell.breaked) me.pos = me.pos + 1 > POS_MAX ? 0 : ++me.pos;
    };
    return { spellIndex: SPELL_INDEX, ok: true, name: 'moveRight', title: 'Move right', delivery: 5, message: 'moved right', effect }
};
function selfInvincibleStun(params) {

};

const spells = {
    list: {
        '2': moveLeft, //left
        '6': moveRight, //right
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