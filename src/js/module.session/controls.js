const config = {
    KEY: {
        W: 87,
        S: 83,
        D: 68,
        A: 65,
        SPACE: 32,
        ARRUP: 37,
        ONE: 49
    },
    MOUSE: {
        MOVE: 'mousemove',
        DOWN: 'mousedown',
        UP: 'mouseup',
        OVER: 'mouseover',
        OUT: 'mouseout',
    }
}

const mapEventType = (type) => {
    if (type == 'touchmove') return 'mousemove'; 
    if (type == 'touchstart') return 'mousedown'; 
    if (type == 'touchend') return 'mouseup'; 
    return type;
};
class Controls {
    constructor(state) {
        this.state = state;
        this.keylayout = {};
        this.keyaction = {};
        this.mouselayout = {};
        this.mouseaction = {};
        let mouseMoveTimeout;

        let keyStateIs = (event) => {
            const theCode = event.keyCode || event.which;
            if (!this.keylayout[theCode]) this.keylayout[theCode] = {};
            if (event.type == 'keydown') {
                this.keylayout[theCode].status = true;
            };
            if (event.type == 'keyup') {
                this.keylayout[theCode].status = false;
            };
        };
        
        let mouseMoveIs = (event) => {
            const theType = mapEventType(event.type);
            if (!this.mouselayout[theType]) this.mouselayout[theType] = {};
            this.mouselayout[theType].status = true;
            this.mouselayout[theType].event = event;
            if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(() => this.mouselayout[theType].status = false, 150);
        };
        
        let mouseDownIs = (event) => {
            let theType = mapEventType(event.type);
            if (!this.mouselayout[theType]) this.mouselayout[theType] = {};
            this.mouselayout[theType].event = event;
            if (theType == 'mousedown') {
                this.mouselayout['mousedown'].status = true;
            };
            if (theType == 'mouseup') {
                this.mouselayout['mousedown'].status = false;
            };
        };
        
        window.addEventListener('keydown', (event) => {
            keyStateIs(event);
        }, true);
        window.addEventListener('keyup', (event) => {
            keyStateIs(event);
        }, true);
        window.addEventListener('mousemove', (event) => {
            mouseMoveIs(event);
        }, true);
        window.addEventListener('mousedown', (event) => {
            mouseDownIs(event);
        }, true);
        window.addEventListener('mouseup', (event) => {
            mouseDownIs(event);
        }, true);
        
        window.addEventListener('touchmove', (event) => {
            mouseMoveIs(event);
        }, true);
        window.addEventListener('touchstart', (event) => {
            mouseDownIs(event);
        }, true);
        window.addEventListener('touchend', (event) => {
            mouseDownIs(event);
        }, true);
        // game.eb.on('ticker-tick', () => {
        //     for (let k in this.keylayout) if (this.keylayout[k] && this.keylayout[k].status && this.keylayout[k].action) this.keylayout[k].action();
        // })
    };
    bind(actions) {
        actions.map(ac => {
            ac.keys.map(kk => {
                this.keylayout[ config.KEY[kk] ] = {
                    status: false,
                    action: () => ac.action(this.keylayout[ config.KEY[kk] ], this.state)
                }
            })
        })
    };
    bindMouse(actions) {
        actions.map(ac => {
            ac.mouse.map(kk => {
                this.mouselayout[ config.MOUSE[kk] ] = {
                    status: false,
                    action: () => ac.action(this.mouselayout[ config.MOUSE[kk] ], this.state)
                }
            })
        })
    }

    unbindMouse(action) {
        this.bindMouse([
            {
                mouse: [action],
                action: () => {}
            }
        ]);
    }

    unbind(actions) {
        const kk = (k) => {
            let ks = [];
            k.map(kk => ks.push(this.masterControls.KEY[kk]));
            return this.masterControls.keybind(...[ks])
        };
        actions.map(ac => {
            kk(ac.keys).action(() => {});
        })
    }
}

export default Controls