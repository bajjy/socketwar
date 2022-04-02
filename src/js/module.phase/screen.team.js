
const TEMPLATE_TEAM = /*html*/`
    <div class="template-team">
        <div class="header hidden">
            <div class="shareLink">share link:</div>
            <div class="link">111111111111</div>
        </div>
        <div class="start">
            <button class="startGame hidden">START GAME</button>
        </div>
        <div class="tagline">select your team</div>
        <div class="teams">
            <div class="teamReds">
                <h2 class="title">REDS</h2>
            </div>
            <div class="connected">
                <h2 class="title">players</h2>
            </div>
            <div class="teamGreens">
                <h2 class="title">GREENS</h2>
            </div>
        </div>
    </div>
`;
const EL_PLAYER = (name, owner) => {
    return /*html*/`
        <div class="playerBox ${owner && 'owner'}">
            ${name}
        </div>
    `;
};
const elements = {
    header: '',
    link: '',
    startGame: '',
    teamReds: '',
    connected: '',
    teamGreens: '',
};

export default function team(params) {
    const state = params.state;
    const { main, socket, commands } = state.system;
    // const me = {name: 'Vasyl', role: 'player'}//state.meta.player;
    const me = state.meta.player;

    main.innerHTML = '';
    main.insertAdjacentHTML("beforeend", TEMPLATE_TEAM);
    Object.keys(elements).map(name => {
        elements[name] = main.querySelector('.' + name);
    });
    if (me.role === 'owner') {
        elements.header.classList.remove('hidden');
        elements.startGame.classList.remove('hidden');
        elements.link.innerHTML = me.link;
    };

    socket.on('get-teams-response', res => {
        const el = [elements.connected, elements.teamReds, elements.teamGreens];
        [...document.querySelectorAll('.playerBox')].forEach(box => box.remove());
        res.forEach((team, i) => 
            team.map(({ name }) => {
                el[i].insertAdjacentHTML("beforeend", EL_PLAYER(name, `${name === me.name && 'me'} ${me.role === 'owner' && 'owner'}`));
            })
        );
    });
    socket.on('new-game-response', res => {
        console.log(res);
        commands.switchScreen('game');
    });
    socket.emit('get-teams');

    elements.teamReds.addEventListener('click', (e) => {
        socket.emit('update-teams', 1);
    });
    elements.connected.addEventListener('click', (e) => {
        socket.emit('update-teams', false);
    });
    elements.teamGreens.addEventListener('click', (e) => {
        socket.emit('update-teams', 2);
    });
    elements.startGame.addEventListener('click', (e) => {
        socket.emit('new-game');
    });
};