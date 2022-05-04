const allowedActions = {
    moveCursor(params) {
        if (params.x && params.y) return true
    },
    magicStarted(params) {
        return true
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
    me['magicStarted'] = 1000 / (1000 / 60); //62.5 times = 1sec
};

class Actions {
    constructor(gameData) {
        this.gameData = gameData;
    }
    availableActions(player, act) {
        const list = {
            moveCursor,
            magicStarted
        };
        list[act.title]({
            gameData: this.gameData,
            me: this.gameData[player],
            act: act
        })
    }
    setAction(player, actions) {
        const act = actions[actions.length - 1];
        allowedActions[act.title] && allowedActions[act.title](act) && this.availableActions(player, act);
    }
    checkAction(player) {
        if (this.gameData[player]) {
            const thePlayer = this.gameData[player];
            
            if (thePlayer.magicEnded) {
                delete thePlayer.magicEnded;
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