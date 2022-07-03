function moveLeft(params) {
    const effect = (relevantParams) => {
        const { player, gameData } = relevantParams;
        const me = gameData[player];
        const POS_MAX = 13; // 0 - 13 total positions = 14

        me.pos = me.pos - 1 < 0 ? POS_MAX : --me.pos;
    };
    return { ok: true, name: 'moveLeft', title: 'Move left', delivery: 5, message: 'moved left', effect }
};
function moveRight(params) {
    const effect = (relevantParams) => {
        const { player, gameData } = relevantParams;
        const me = gameData[player];
        const POS_MAX = 13; // 0 - 13 total positions = 14
        
        me.pos = me.pos + 1 > POS_MAX ? 0 : ++me.pos;
    };
    return { ok: true, name: 'moveRight', title: 'Move right', delivery: 5, message: 'moved right', effect }
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
        return spellFunc(params);
    }
}

module.exports = spells;