const fps60 = 1000 / 60;
const allowedActions = {
    moveCursor(params) {
        if (params.x && params.y) return true
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

class Actions {
    constructor(gameData) {
        this.gameData = gameData;
    }
    availableActions(player, act) {
        const list = {
            moveCursor
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
}

module.exports = Actions;