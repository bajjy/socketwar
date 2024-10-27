import s4spellIndex from './s4spellIndex.js'
import {fireBallTarget} from './spells/fireBallTarget.js';
import { moveLeft, moveRight, jumpLeft, jumpRight } from './spells/moveJump.js';

let SPELL_INDEX = s4spellIndex();

function selfInvincibleStun(params) {

};

export const spells = {
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

