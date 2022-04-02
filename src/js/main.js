import '../css/index.less';
import './poly.raftimer.js';

/*modules */
import phase from './module.phase';

var main = document.querySelector('main');

function init() {
    phase.init(main)
};

init();