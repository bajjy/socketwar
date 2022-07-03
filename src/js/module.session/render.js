
function addAnimation(body) {
    if (!dynamicStyles) {
      dynamicStyles = document.createElement('style');
      dynamicStyles.type = 'text/css';
      document.head.appendChild(dynamicStyles);
    }
  
    dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
};
function graphicsSpellsMoveRight(params, player, socket) {
    const { state, session, elements, me } = params;
    const POS_MAX = 13; // 0 - 13 total positions = 14  
    const targetPos = player.pos + 1 > POS_MAX ? 0 : player.pos + 1;
    const playerElemName = `playerInfo_${socket}`;
    const element = elements[playerElemName];

};
function graphicsPlayersPos(params) {
    const { state, session, elements, me } = params;
    const mySocket = state.system.socket.id;
    const players = session.render.data;
    
    Object.keys(players).map((key, index) => {
        const player = players[key];
        const playerElemName = `playerInfo_${key}`;
        const circle = elements.battlefield.querySelector(`.circle.circle-${player.pos + 1}`).getBoundingClientRect();
        const element = elements[playerElemName] ? elements[playerElemName] : document.createElement("div");

        if (!elements[playerElemName]) {
            element.className = `player-point ${playerElemName}`;
            elements.gameCanvas.appendChild(element);
            elements[playerElemName] = element;
        };
        
        element.style.width = circle.width - 10 + 'px';
        element.style.height = circle.height - 10 + 'px';
        element.style.left = circle.x + 5 + 'px';
        element.style.top = circle.y + 5 + 'px';
    });
    // console.log(session)
};

function gamestateIdle(params) {
    const { state, session, elements } = params;
    const req = {
        title: 'magicStarted'
    };

    elements.magiccircle.classList.add('hidden');
    elements.startspell.classList.remove('hidden');
    session.arcanes = [];
    session.lastArcane = null;

    state.session.controls.bindMouse([
        {
            mouse: ['DOWN'],
            action: (e) => {
                console.log('startspell');
                e.event.target === elements.startspell && session.act(state, req);
            }
        }
    ]);
    state.session.controls.bindMouse([
        {
            mouse: ['MOVE'],
            action: () => {}
        }
    ]);
};

function gamestateMagicStarted(params) {
    const { state, session, elements } = params;

    elements.magiccircle.classList.remove('hidden');
    elements.startspell.classList.add('hidden');
    state.session.controls.bindMouse([
        {
            mouse: ['DOWN'],
            action: () => {}
        }
    ]);
    state.session.controls.bindMouse([
        {
            mouse: ['MOVE'],
            action: (e) => {
                const { lastArcane } = session;
                const currentArcane = e.event.target.dataset.arcane;

                if ( currentArcane && lastArcane != currentArcane) {
                    session.lastArcane = currentArcane;
                    session.act(state, { title: 'magicArcaneSet', value: currentArcane })
                }
            }
        }
    ]);
    state.session.controls.mouselayout.mousedown.status = true;
};
function gamestateMagicProcess(params) {
    const { state, session, me } = params;
    const isMouseDown = state.session.controls.mouselayout.mousedown.status;

    if (!isMouseDown && me.arcanes.length) return session.act(state, { title: 'magicProcessSuccess' });
    if (!isMouseDown && !me.arcanes.length) session.act(state, { title: 'magicProcessBraker' });
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
            action: () => {}
        }
    ]);
};

function eventOnSpell() {
    const socket = this.state.system.socket.id;
    const isMe = socket === id;
    const className = `.target-${id}.target`;
    const el = document.querySelector(className);
    const data = gameData[id];
    
    state.session.controls.bindMouse([
        {
            mouse: ['MOVE'],
            action: (e) => {
                const req = {
                    title: 'moveCursor',
                    x: e.event.x,
                    y: e.event.y,
                }
                session.act(state, req);
            }
        }
    ]);

    const styles = (target) => {
        target.style.top = data.y - data.height / 2 + 'px';
        target.style.left = data.x - data.width / 2 + 'px';
        target.style.width = data.width + 'px';
        target.style.height = data.height + 'px';
    };

    if (!el) {
        const newEl = document.createElement('div');
        newEl.className = `target-${id} target ${isMe && 'me'}`;
        newEl.innerHTML = `
                <div class="pl-name">${data.meta.name}</div>
            `;
        styles(newEl);
        return this.canvas.appendChild(newEl);
    };

    styles(el);
}
class Render {
    constructor(state) {
        this.state = state;
        this.session = state.session;
        this.canvas = state.session.canvas;
        this.elements = state.session.elements;
        this.data = [];
        this.me = {};
        this.time = 0;

        gamestateIdle(this);
    }
    stateManager(data) {
        const socket = this.state.system.socket.id;
        const me = data[socket];
        
        this.data = data;
        this.me = me;

        // console.log(me.spells)
        
        if (me.magicStartedOk) gamestateMagicStarted(this);
        if (me.magicStarted) gamestateMagicProcess(this);
        if (me.magicEnded) gamestateIdle(this);
    }
    spellsManager(data) {
        const socket = this.state.system.socket.id;
        const me = data[socket];
        
        me.spells.map(spell => {
            spell.exec && console.log(spell.message)
        })
    }
    graphicsManager() {
        if (this.time === 1) graphicsPlayersPos(this); //first run set positions;
        Object.keys(players).map((key, index) => {
            const player = players[key];
            graphicsSpellsMoveRight(this, player, key);
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