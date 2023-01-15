import '../css/index.less';
import './poly.raftimer.js';
//import './aframe.js';

/*modules */
import phase from './module.phase';

window.stopRender = false;

const main = document.querySelector('main');

function init() {
    phase.init(main)
};

init();