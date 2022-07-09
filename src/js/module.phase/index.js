import io from 'socket.io-client';
import screenHome from './screen.home';
import screenTeam from './screen.team';
import screenGame from './screen.game';

const socket = io();
const state = {
    screen: 'home',
    screens: {
        home: screenHome,
        team: screenTeam,
        game: screenGame,
    },
    meta: {},
    system: {},
    session: {}
};

export default {
    name: 'phase',
    init(main) {
        state.system = {
            main, 
            socket, 
            commands: {
                switchScreen(screen) {
                    state.screen = screen;
                    state.screens[state.screen]({ state })
                },
            }
        };
        state.screens[state.screen]({ state })
    }
};