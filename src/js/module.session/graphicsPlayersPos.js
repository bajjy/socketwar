function graphicsPlayersPos(params, player, socket) {
    const { elements } = params;

    const playerElemName = `playerInfo_${socket}`;
    const circle = elements.battlefield.querySelector(`.circle.circle-${player.pos + 1}`).getBoundingClientRect();
    const element = elements[playerElemName] ? elements[playerElemName] : document.createElement("div");

    if (!elements[playerElemName]) {
        element.className = `player-point ${playerElemName}`;
        element.dataset.player = socket;
        elements.gameCanvas.appendChild(element);
        elements[playerElemName] = element;
    };

    element.style.width = circle.width + 'px';
    element.style.height = circle.height + 'px';
    element.style.left = circle.x + 'px';
    element.style.top = circle.y + 'px';
    element.dataset.playerPos = player.pos;
};

export default graphicsPlayersPos;