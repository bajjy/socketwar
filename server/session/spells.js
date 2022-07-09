let SPELL_INDEX = s4();

function s4() {
    var r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return r() + r();
};

function moveLeft(params) {
    const effect = (relevantParams) => {
        const { player, gameData, spell } = relevantParams;
        const me = gameData[player];
        const POS_MAX = 13; // 0 - 13 total positions = 14
        const targetPos = me.pos - 1 < 0 ? POS_MAX : me.pos - 1;

        //check players positions
        // Object.keys(gameData).filter(pl => pl !== player).map(key => {
        Object.keys(gameData).map(key => {
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
        const { player, gameData, spell } = relevantParams;
        const me = gameData[player];
        const POS_MAX = 13; // 0 - 13 total positions = 14
        const targetPos = me.pos + 1 > POS_MAX ? 0 : me.pos + 1;

        Object.keys(gameData).map(key => {
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
        '167': selfInvincibleStun
    },
    cast(params) {
        const { arcanes } = params.me;
        const spell = arcanes.join('');
        const spellFunc = this.list[spell];

        if (!spellFunc) return { arcanes, error: 1, message: 'not exist' };
        
        SPELL_INDEX = s4();
        return spellFunc(params);
    }
}

module.exports = spells;