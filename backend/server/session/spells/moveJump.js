import s4spellIndex from '../s4spellIndex.js'
import { CONFIG } from '../../config.mjs' 

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
    return { spellIndex: SPELL_INDEX, ok: true, name: 'moveLeft', title: 'Move left', delivery: CONFIG.spells.move.delivery, message: 'moved left', effect }
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
    return { spellIndex: SPELL_INDEX, ok: true, name: 'moveRight', title: 'Move right', delivery: CONFIG.spells.move.delivery, message: 'moved right', effect }
};

function jumpLeft(params) {
    const effect = (relevantParams) => {
        const { player, gameData, spell, config } = relevantParams;
        const me = gameData[player];
        const POS_MAX = config.battlefieldSize; // 0 - 16 total positions = 17
        const targetPos = me.pos - 2 < 0 ? POS_MAX - 1 : me.pos - 2;

        //check players positions
        Object.keys(gameData).filter(pl => pl !== player).map(key => {
            // Object.keys(gameData).map(key => {
            if (gameData[key].pos === targetPos) {
                // if (gameData[key].pos) {
                spell.breaked = { by: key, message: 'FAIL' }
            }
        });
        if (!spell.breaked) me.pos = me.pos - 2 < 0 ? POS_MAX - 1: me.pos -= 2;
    };
    return { spellIndex: SPELL_INDEX, ok: true, name: 'jumpLeft', title: 'Jumped left', delivery: CONFIG.spells.jump.delivery, message: 'jumped left', effect }
};
function jumpRight(params) {
    const effect = (relevantParams) => {
        const { player, gameData, spell, config } = relevantParams;
        const me = gameData[player];
        const POS_MAX = config.battlefieldSize; // 0 - 16 total positions = 17
        const targetPos = me.pos + 2 > POS_MAX ? 1 : me.pos + 2;

        Object.keys(gameData).filter(pl => pl !== player).map(key => {
            // Object.keys(gameData).map(key => {
            if (gameData[key].pos === targetPos) {
                // if (gameData[key].pos) {
                spell.breaked = { by: key, message: 'FAIL' }
            }
        });
        if (!spell.breaked) me.pos = me.pos + 2 > POS_MAX ? 1 : me.pos += 2;
    };
    return { spellIndex: SPELL_INDEX, ok: true, name: 'jumpRight', title: 'Jumped right', delivery: CONFIG.spells.jump.delivery, message: 'jumped right', effect }
};

export {
    moveLeft,
    moveRight,
    jumpLeft,
    jumpRight
};