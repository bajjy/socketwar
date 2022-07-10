import session from '../module.session';
import TEMPLATE_GAME from './template.game';

const elements = {
    gameCanvas: '',
    gameInfo: '',
    battlefield: '',
    magiccircle: '',
    startspell: '',
};

export default function game(params) {
    const state = params.state;
    const { main, socket, commands } = state.system;

    //const audio = new Audio('start1.mp3');

    main.innerHTML = '';
    main.insertAdjacentHTML('beforeend', TEMPLATE_GAME);

    Object.keys(elements).map(name => {
        elements[name] = main.querySelector('.' + name);
    });

    // test socket REMOVE
    socket.emit('create-request', 'Vasyl' + Math.random(), res => {
        state.meta.player = res;
        state.meta.config = res.config;
        socket.emit('get-teams');
        socket.emit('update-teams', 1);
        socket.on('get-teams-response', () => socket.emit('new-game') );
        socket.on('new-game-response', (res) => {
            socket.emit('start-game');
        });
        session.init(state, elements.gameCanvas, elements);
        
    });

    // prod line UNCOMMENT
    // socket.emit('start-game');
    // session.init(state, elements.gameCanvas, elements);

    socket.on('ticker-tick', res => {
        // console.log(res.data[socket.id])
        session.tick(state);
        // console.log(res.data[socket.id].magicStarted)
        if (state.session.actions.length) socket.emit('ticker-tick-request', state.session.actions);
        session.clearActions(state);
        session.tickApply(res, state);
    });
 
    //audio.play();
};