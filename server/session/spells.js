function moveLeft(params) {
    const effect = (relevantParams) => {
        console.log('<<<<<<<<<<<<<<<<')
        console.log('moved left')
    };
    return { ok: true, name: 'moveLeft', title: 'Move left', delivery: 0, message: 'moved left', effect }
};
function moveRight(params) {
    const effect = (relevantParams) => {
        console.log('>>>>>>>>>>>>>>>>')
        console.log('moved right')
    };
    return { ok: true, name: 'moveRight', title: 'Move right', delivery: 0, message: 'moved right', effect }
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

        if (!spellFunc) return { error: 1, message: 'not exist' };
        return spellFunc(params);
    }
}

module.exports = spells;