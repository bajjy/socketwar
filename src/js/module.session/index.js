import Controls from "./controls";
import Render from "./render";

function act(target, prop, value) {
    console.log(target)
    actions.push({ target, prop, value });
    if (actions.length > 2) actions.shift();
};
function ctrl(controls) {
    controls.bind([
        {
            keys: ['W'], action: () => act(['clients', clientIndex, 'unit', 'skills', 'moving'], 'up', 10)//gg.eb.emit('socketUpdateGame', [unit.skills.moving.up] = 1) //хуйня. сделать чтоб была рассылка и прием по тику
        },
        {
            keys: ['S'], action: () => act(['clients', clientIndex, 'unit', 'skills', 'moving'], 'down', 10)
        },
        {
            keys: ['D'], action: () => act(['clients', clientIndex, 'unit', 'skills', 'moving'], 'right', 10)
        },
        {
            keys: ['A'], action: () => act(['clients', clientIndex, 'unit', 'skills', 'moving'], 'left', 10)
        },
        {
            keys: ['SPACE'], action: () => act(['clients', clientIndex, 'unit', 'skills', 'fire'], 'fire', 1)
        }
    ]);
}

export default {
    name: 'session',
    init(state, gameCanvas) {
        state.session = {
            canvas: gameCanvas,
            controls: new Controls({}),
            actions: []
        };
        state.session['render'] = new Render(state),
        state.session.controls.bindMouse([
            {
                mouse: ['MOVE'], 
                action: (e) => {
                    const req = {
                        title: 'moveCursor',
                        x: e.event.x,
                        y: e.event.y,
                    }
                    this.act(state, req);
                }
            }
        ])
    },
    act(state, req) {
        state.session.actions.push(req);
        if (state.session.actions.length > 2) state.session.actions.shift();
    },
    clearActions(state) {
        state.session.actions = []
    },
    tickApply(response, state) {
        const { socket } = state.system;
    
        state.session.render.players(response.data);
    },
    tick(state) {
        const ctrl = state.session.controls;
        for (let k in ctrl.mouselayout) {
            if (ctrl.mouselayout[k] && ctrl.mouselayout[k].status && ctrl.mouselayout[k].action){
                ctrl.mouselayout[k].action()
            }
        };
    }
};