//                      ['a', 'z', 'o', 't', 'd', 'i', 'b', 'p'];
const ALLOWED_ARCANES = ['0', '1', '2', '3', '4', '5', '6', '7'];

const spells = require('./spells');

const allowedActions = {
    moveCursor(params) {
        if (params.x && params.y) return true
    },
    magicStarted() {
        return true
    },
    magicProcessBraker(params) {
        if (params.me.magicStarted) return true
    },
    magicArcaneSet(params) {
        const { me } = params;
        if (me.magicStarted) return true
    },
    magicProcessSuccess(params) {
        const { me } = params;
        if (me.magicStarted) return true
    }
};
const moveCursor = (params) => {
    const {
        gameData,
        me,
        act,
    } = params;
    me.x = act.x;
    me.y = act.y;
};
const magicStarted = (params) => {
    const {
        gameData,
        me,
        act,
    } = params;
    me['magicStarted'] = 1000//1000 / (1000 / 60); //62.5 times = 1sec
    me.magicStartedOker = true;
};
const magicProcessBraker = (params) => {
    const {
        gameData,
        me,
        act,
    } = params;
    me.magicStarted = -1;
    me.magicProcessBraker = true;
    me.arcanes = [];
};
const magicArcaneSet = (params) => {
    const {
        gameData,
        me,
        act,
    } = params;

    const lastArcane = me.arcanes[me.arcanes.length - 1];
    const arcane = act.value;
    const isAllowed = ALLOWED_ARCANES.includes(arcane);

    console.log('arcane, lastArcane, isAllowed')
    console.log(arcane, lastArcane, isAllowed)
    if (arcane == lastArcane || !isAllowed) {
        me.magicStarted = -1;
        me.magicProcessBraker = true;
        me.arcanes = [];
        return;
    }

    me.arcanes.push(arcane);
};
const magicProcessSuccess = (params) => {
    const { me } = params;
    const spellResult = spells.cast(params);
    
    me.magicStarted = -1;
    me.lastUsedArcanes = me.arcanes;
    me.arcanes = [];

    if (spellResult.error) {
        return me.spellFailed = spellResult;
    }
    me.spells.push(spellResult);
    
};

class Actions {
    constructor(gameData) {
        this.gameData = gameData;
    }
    availableActions(player, act) {
        const list = {
            moveCursor,
            magicStarted,
            magicProcessBraker,
            magicArcaneSet,
            magicProcessSuccess
        };
        list[act.title]({
            gameData: this.gameData,
            me: this.gameData[player],
            act: act
        })
    }
    setAction(player, actions) {
        const act = actions[actions.length - 1];
        allowedActions[act.title] && 
        allowedActions[act.title]({ gameData: this.gameData, me: this.gameData[player], act: act}) && 
        this.availableActions(player, act);
    }
    checkSpells(player) {
        const gameData = this.gameData;
        const me = this.gameData[player];
        me.spells.map(spell => {
            //{ ok: true, name: 'moveLeft', title: 'Move left', delivery: 0, message: 'moved left', effect }
            if (!spell.finished) {
                spell.delivery -= 1;
                if (spell.delivery <= 0) {
                    spell.effect(player, gameData);
                    spell.finished = true;
                };
             }
        });

    }
    checkAction(player) {
        if (this.gameData[player]) {
            const thePlayer = this.gameData[player];
            
            this.checkSpells(player);
            
            if (thePlayer.magicEnded) {
                delete thePlayer.magicEnded;
            }
            if (thePlayer.magicProcessBraked) {
                delete thePlayer.magicProcessBraker;
                delete thePlayer.magicProcessBraked;
            }
            if (thePlayer.magicProcessBraker) {
                thePlayer.magicProcessBraked = true;
            }
            if (thePlayer.magicStartedOk) {
                delete thePlayer.magicStartedOker;
                delete thePlayer.magicStartedOk;
            }
            if (thePlayer.magicStartedOker) {
                thePlayer.magicStartedOk = true;
            }
            if (thePlayer.magicStarted) {
                thePlayer.magicStarted -= 1;
                if (thePlayer.magicStarted <= 0) {
                    delete thePlayer.magicStarted;
                    thePlayer.magicEnded = true;
                };
            }
        }
    }
}

module.exports = Actions;