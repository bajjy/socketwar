function graphicsPlayersPos(params, player, socket) {
    const { elements } = params;

    const playerElemName = `playerInfo_${socket}`;
    const circle = elements.battlefield.querySelector(`.circle.circle-${player.pos + 1}`).getBoundingClientRect();
    const element = elements[playerElemName] ? elements[playerElemName] : document.createElement("div");

    if (!elements[playerElemName]) {
        element.className = `player-point black-sphere ${playerElemName}`;
        element.dataset.player = socket;
        elements.gameCanvas.appendChild(element);
        elements[playerElemName] = element;
    };

    element.style.width = circle.height - 10 + 'px';
    element.style.height = circle.height - 10 + 'px';
    element.style.left = circle.x + 5 + 'px';
    element.style.top = circle.y + 5 + 'px';
    element.dataset.playerPos = player.pos;
};

export default graphicsPlayersPos;