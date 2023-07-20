import io from 'socket.io-client';
import screenHome from './screen.home';
import screenTeam from './screen.team';
import screenGame from './screen.game';
import { runesGreek } from '../res.runes.greek';

const socket = io();
const state = {
    screen: 'game',
    screens: {
        home: screenHome,
        team: screenTeam,
        game: screenGame,
    },
    resources: {
        runes: runesGreek,
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