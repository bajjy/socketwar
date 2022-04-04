import session from '../module.session';

const TEMPLATE_GAME = /*html*/`
    <div class="template-game">
        <div class="gameCanvas">
            <div class="battlefield">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="circle circle-4"></div>
                <div class="circle circle-5"></div>
                <div class="circle circle-6"></div>
                <div class="circle circle-7"></div>
                <div class="circle circle-8"></div>
                <div class="circle circle-9"></div>
                <div class="circle circle-10"></div>
                <div class="circle circle-11"></div>
                <div class="circle circle-12"></div>
                <div class="circle circle-13"></div>
                <div class="circle circle-14"></div>
            </div>
        </div>
        <div class="gameInfo hidden">
            READY
        </div>
    </div>
`;
const elements = {
    gameCanvas: '',
    gameInfo: '',
};

export default function game(params) {
    const state = params.state;
    const { main, socket, commands } = state.system;

    const audio = new Audio('start1.mp3');

    main.innerHTML = '';
    main.insertAdjacentHTML('beforeend', TEMPLATE_GAME);

    Object.keys(elements).map(name => {
        elements[name] = main.querySelector('.' + name);
    });
    
    session.init(state, elements.gameCanvas);

    // test socket REMOVE
    socket.emit('create-request', 'Vasyl' + Math.random(), res => {
        state.meta.player = res;
        socket.emit('get-teams');
        socket.emit('update-teams', 1);
        socket.on('get-teams-response', () => socket.emit('new-game') );
        socket.on('new-game-response', () => socket.emit('start-game') );

        // const gameInstance = new Game(elements.gameCanvas, me.link);
        // gameInstance.scenario.setModules([moduleXx3d]);
        // gameInstance.scenario.run();
    });

    // socket.emit('start-game');
    socket.on('ticker-tick', res => {
        // console.log(res.data[socket.id])
        session.tick(state);
        if (state.session.actions.length) socket.emit('ticker-tick-request', state.session.actions);
        session.clearActions(state);
        session.tickApply(res, state);
    });
 
    //audio.play();
};