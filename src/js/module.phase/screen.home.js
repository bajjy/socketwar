
const TEMPLATE_HOME = /*html*/`
    <div class="template-home">
        <div class="header">
            TANKZ <br />TOWN
        </div>
        <div class="">
            <input class="nickname" type="text" placeholder="your name" minlength="5" maxlength="20" required/>
        </div>
        <div class="">
            <button class="newGame">NEW GAME</button>
        </div>
        <div class="">
            <input class="link" type="text" placeholder="game link" />
        </div>
        <div class="">
            <button class="joinGame">JOIN GAME</button>
        </div>
    </div>
`;
const elements = {
    nickname: '',
    link: '',
    joinGame: '',
    newGame: '',
};

export default function home(params) {
    const state = params.state;
    const { main, socket, commands } = state.system;
    
    main.innerHTML = '';
    main.insertAdjacentHTML("beforeend", TEMPLATE_HOME);
    Object.keys(elements).map(name => {
        elements[name] = main.querySelector('.' + name);
    });

    elements.newGame.addEventListener('click', (e) => {
        //elements.nickname.checkValidity();
        //if (!elements.nickname.validity.valid) return elements.nickname.setCustomValidity('Name should be 5 - 20 chars long');

        socket.emit('create-request', elements.nickname.value, res => {
            state.meta.player = res;
            state.meta.config = res.config;
            commands.switchScreen('team');
            console.log(state)
        });
    });
    
    elements.joinGame.addEventListener('click', (e) => {
        //elements.link.checkValidity();
        //if (!elements.link.validity.valid) return elements.link.setCustomValidity('Link is not valid');

        const req = {
            name: elements.nickname.value,
            link: elements.link.value
        }
        socket.emit('join-request', req, res => {
            state.meta.player = res;
            state.meta.config = res.config;
            commands.switchScreen('team');
        });
    });
};