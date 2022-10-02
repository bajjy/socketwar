import graphicsRegularMessage from './graphicsRegularMessage';
import graphicsSpellsMoveRight from './graphicsSpellsMoveRight';
import graphicsSpellsFireBallTarget from './graphicsSpellsFireBallTarget';
import graphicsPlayersPos from './graphicsPlayersPos';

function gamestateIdle(params) {
    const { state, session, elements, renderStore,  } = params;
    const req = {
        title: 'magicStarted'
    };

    delete renderStore.magicProcessBraker;
    delete renderStore.magicProcessSuccess;

    elements.magiccircle.classList.add('hidden');
    elements.startspell.classList.remove('hidden');
    session.arcanes = [];
    session.lastArcane = null;

    state.session.controls.bindMouse([
        {
            mouse: ['DOWN'],
            action: (e, currentState) => {
                const { me, renderStore } = currentState.session.render;
                const lastSpell = me.spells[me.spells.length - 1];

                console.log(me);
                if (e.event.target.dataset.startspell) {
                    console.log('startspell');
                    session.act(state, req);
                    return state.session.controls.unbindMouse('DOWN');
                };
                if (e.event.target.dataset.target && lastSpell && lastSpell.setTarget && !renderStore.magicProcessSetTarget) {
                    console.log('set target', e.event.target.dataset.target);
                    renderStore.magicProcessSetTarget = true;
                    session.act(state, {
                        title: 'magicProcessSetTarget',
                        value: {
                            target: e.event.target.dataset.target,
                            spellIndex: lastSpell.spellIndex,
                        }
                    });
                };
                // e.event.target === elements.startspell && session.act(state, req);
                // state.session.controls.unbindMouse('DOWN');
            }
        }
    ]);
    state.session.controls.unbindMouse('MOVE');
};

function gamestateMagicStarted(params) {
    const { state, session, elements } = params;

    elements.magiccircle.classList.remove('hidden');
    elements.startspell.classList.add('hidden');
    
    state.session.controls.unbindMouse('DOWN');
    state.session.controls.bindMouse([
        {
            mouse: ['MOVE'],
            action: (e) => {
                const { lastArcane } = session;
                const currentArcane = e.event.target.dataset.arcane;

                if (currentArcane && lastArcane != currentArcane) {
                    session.lastArcane = currentArcane;
                    session.act(state, { title: 'magicArcaneSet', value: currentArcane })
                }
            }
        }
    ]);
    state.session.controls.mouselayout.mousedown.status = true;
};
function gamestateMagicProcess(params) {
    const { state, session, me, renderStore } = params;
    const isMouseDown = state.session.controls.mouselayout.mousedown.status;

    if (!isMouseDown && me.arcanes.length && !renderStore.magicProcessSuccess) {
        renderStore.magicProcessSuccess = true;
        return session.act(state, { title: 'magicProcessSuccess' });
    };
    if (!isMouseDown && !me.arcanes.length && !renderStore.magicProcessBraker) {
        renderStore.magicProcessBraker = true;
        session.act(state, { title: 'magicProcessBraker' });
    };
};

function gamestateMagicFailed(params) {
    const { state, session, me, renderStore } = params;
    //clear arcanes, message, update graphs
    console.log(me.spellFailed);
};
function gamestateMagicSelectTarget(params) {
    const { state, session, elements } = params;

    state.session.controls.bindMouse([
        {
            mouse: ['DOWN'],
            action: (e) => {
                console.log('select target');
                console.log(e.event.target);
            }
        }
    ]);
    state.session.controls.bindMouse([
        {
            mouse: ['MOVE'],
            action: () => { }
        }
    ]);
};

class Render {
    constructor(state) {
        this.state = state;
        this.config = state.meta.config;
        this.session = state.session;
        this.canvas = state.session.canvas;
        this.elements = state.session.elements;
        this.data = [];
        this.me = {};
        this.time = 0;
        this.messages = [];
        this.cycle;
        this.renderStore = {};

        //gamestateIdle(this);
        this.cycle = setInterval(() => {
            this.messages = this.messages.filter(msg => msg.timer >= 0);
            this.messages.map(msg => {
                if (msg.type == 'regular') graphicsRegularMessage(this, msg);
                msg.running = true;
                --msg.timer;
            });
        }, this.config.fps / this.speed);
    }
    stateManager(data) {
        const socket = this.state.system.socket.id;
        const me = data[socket];

        this.data = data;
        this.me = me;

        if (me.spellFailedOk) gamestateMagicFailed(this);
        if (me.magicStartedOk) gamestateMagicStarted(this);
        if (me.magicStarted) gamestateMagicProcess(this);
        if (me.magicEnded) gamestateIdle(this);
        if (this.time === 1) gamestateIdle(this);
    }
    spellsManager(data) {
        const socket = this.state.system.socket.id;
        const me = data[socket];
        const lastSpell = me.spells[me.spells.length - 1];

        if (lastSpell && !lastSpell.setTarget && typeof lastSpell.target === 'number') delete this.renderStore.magicProcessSetTarget;

        me.spells.map(spell => {
            spell.exec && console.log(spell.message)
        })
    }
    graphicsManager() {
        const players = this.session.render.data;
        Object.keys(players).map((key, index) => {
            const player = players[key];

            if (this.time === 1) graphicsPlayersPos(this, player, key); //first run set positions;
            
            graphicsSpellsMoveRight(this, player, key);
            graphicsSpellsFireBallTarget(this, player, key);
            player.spells.map(spell => {

            })
        });
    }
    update(data) {
        this.stateManager(data);
        this.spellsManager(data);
        this.graphicsManager();

        ++this.time;

        Object.keys(data).map(player => {
            //console.log(player)
            //this.elementTarget(player, data);
        });
    }
}

export default Render