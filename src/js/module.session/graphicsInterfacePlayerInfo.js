import graphicsFireBallTargetPos from "./graphicsFireBallTargetPos";
import addAnimation from "./utilAddAnimation";
import s4 from "./utilSFour";

// 1000 / ((1000 / 60) / 0.1); //62.5 times = 1sec. 0.1 - ticker speet setup
// const FPS60 = 1000 / 60;
// const TICKER_SPEED = 0.1;
// const SPEED = FPS60 / TICKER_SPEED;

function graphicsInterfacePlayerInfo(params, player, socket) {
    const { state, config, session, elements, me, messages } = params;

    const MSG_TIMER = 100;
    const SPEED = config.fps / config.speed;
    const INFO_WIDTH = 200;

    const playerElemName = `playerInfo_${socket}`;
    const playerDetailsElemName = `playerDetails_${socket}`;
    const playerElement = elements[playerElemName] && elements[playerElemName].getBoundingClientRect();

    if (!playerElement) return;

console.log(socket)
console.log(player.effects)
//console.log(me.spells)
    
    const element = elements[playerDetailsElemName] ? elements[playerDetailsElemName] : document.createElement("div");
    const playerPos = player.pos;

    if (!elements[playerDetailsElemName]) {
      element.className = `player-detail ${playerElemName}`;
      element.dataset.player = socket;
      elements.gameCanvas.appendChild(element);
      elements[playerDetailsElemName] = element;
    }

    element.dataset.affectedHealth = player.affectedHealth;
    element.dataset.actualHealth = player.actualHealth;
    
    element.innerHTML = /*html*/`
      <div class="player-name">
      <div class="player-hp-bar" data-affectedHealth=${player.affectedHealth} data-actualHealth=${player.actualHealth} style="width: ${player.affectedHealth / player.actualHealth * 100}%"></div>
      <div class="player-name-text">${player.meta.name}</div>
      </div>
      <div class="player-hp" data-affectedHealth=${player.affectedHealth} data-actualHealth=${player.actualHealth}>
          health: ${player.affectedHealth} / ${player.actualHealth}
      </div>
    `;
    element.style.left = playerElement.x - INFO_WIDTH / 2 + 5 + "px";
    element.style.top = playerElement.y - element.getBoundingClientRect().height - 10 + "px";
}
export default graphicsInterfacePlayerInfo;
