import session from '../module.session';
import TEMPLATE_GAME from './template.game';

const elements = {
    gameCanvas: '',
    gameInfo: '',
    battlefield: '',
    magiccircle: '',
    startspell: '',
    messagesinfo: '',
};
let reconnectInterval;

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
        elements.magiccircle.addEventListener("contextmenu", e => e.preventDefault());
    });

    // prod line UNCOMMENT
    // socket.emit('start-game');
    // session.init(state, elements.gameCanvas, elements);

    socket.on('ticker-tick', res => {
        session.tick(state);
        if (state.session.actions.length) socket.emit('ticker-tick-request', state.session.actions);
        
        session.clearActions(state);
        session.tickApply(res, state);
    });
    socket.on('error', function (err) {
        console.log(err)
      });
    // socket.on('connect_error', (e) => {
    //     console.log('connect_error', e)
    //     //socket.connect();
    // });
    socket.on('connect', () => {
        clearInterval(reconnectInterval);
        if (state.meta.player) {
            elements.messagesinfo.insertAdjacentHTML('beforeend', '<div class="mess-item"><span class="title green">RECONNECTED</span></div>');
            setTimeout(() => {socket.emit('reconnect-player', state.meta.player)}, 2000);
        }
    });
    // socket.on('disconnect', (reason) => {
    //     elements.messagesinfo.insertAdjacentHTML('beforeend', '<div class="mess-item"><span class="title red">DISCONNECTED</span></div>');

    //     console.log('disconnect')
    //     console.log(reason)

    //     //socket.disconnect()
    //     reconnectInterval = setInterval(() => {
    //         console.log(socket)
    //     }, 2000);
    // });
    // socket.io.on('reconnect', () => {
    //     elements.messagesinfo.insertAdjacentHTML('beforeend', '<div class="mess-item"><span class="title green">reconnected</span></div>');
    //     console.log('reconnect')
    //     socket.emit('reconnect-player', state.meta.player);
    // });
    // socket.on('reconnect-error', res => {
    //     if (res.error) {
    //         elements.messagesinfo.insertAdjacentHTML('beforeend', `<div class="mess-item"><span class="title red">RECONNECT: ${res.error}</span></div>`);
    //         socket.disconnect();
    //     }
    // });
    //audio.play();
};