import Controls from "./controls";
import Render from "./render";

function act(target, prop, value) {
    console.log(target)
    actions.push({ target, prop, value });
    if (actions.length > 2) actions.shift();
};

export default {
    name: 'session',
    init(state, gameCanvas, elements) {
        state.session = {
            canvas: gameCanvas,
            elements,
            controls: new Controls({}),
            actions: [],
            act: this.act,
            arcanes: [],
            lastArcane: null
        };

        state.session['render'] = new Render(state);
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
    
        state.session.render.update(response.data);
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