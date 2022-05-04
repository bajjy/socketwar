function gamestateIdle(params) {
    const { state, session, elements } = params;
    const req = {
        title: 'magicStarted'
    };

    state.session.controls.bindMouse([
        {
            mouse: ['DOWN'],
            action: (e) => {
                console.log('startspell');
                e.event.target === elements.startspell && session.act(state, req);
            }
        }
    ]);
};

function gamestateMagicStarted(params) {
    const { state, session, elements } = params;
console.log(state.session.controls.mouselayout.mousedown)
console.log(state.session.controls.mouselayout.mousemove)
    // state.session.controls.bindMouse([
    //     {
    //         mouse: ['DOWN'],
    //         action: (e) => {
    //             console.log('gamestateMagicStarted');
    //             console.log(e.event.target);
    //         }
    //     }
    // ]);
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

        gamestateIdle(this);
    }
    stateManager(data) {
        const socket = this.state.system.socket.id;
        const me = data[socket];

        if (me.magicStarted) gamestateMagicStarted(this);
        if (me.magicEnded) gamestateIdle(this);
    }
    graphicsManager() {
        
    }
    update(data) {
        console.log(data)
        this.stateManager(data);
        Object.keys(data).map(player => {
            //console.log(player)
            //this.elementTarget(player, data);
        });
    }
}

export default Render