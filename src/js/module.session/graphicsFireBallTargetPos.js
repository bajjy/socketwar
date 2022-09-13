function graphicsFireBallTargetPos(params, player, key, remove) {
    const { elements } = params;

    const fireBallTargetElemName = `fireBallTarget_${key}`;
    const circle = elements.battlefield.querySelector(`.circle.circle-${player.pos + 1}`).getBoundingClientRect();
    const element = elements[fireBallTargetElemName] ? elements[fireBallTargetElemName] : document.createElement("div");

    if (remove) {
        delete elements[fireBallTargetElemName];
        return document.querySelector('.' + fireBallTargetElemName).remove();
    };

    if (elements[fireBallTargetElemName]) return;
    
    element.className = `fireBallTarget-point ${fireBallTargetElemName}`;
    elements.gameCanvas.appendChild(element);
    elements[fireBallTargetElemName] = element;

    element.style.width = circle.width - 30 + 'px';
    element.style.height = circle.height - 30 + 'px';
    element.style.left = circle.x + 15 + 'px';
    element.style.top = circle.y + 15 + 'px';

    return element;
};

export default graphicsFireBallTargetPos;