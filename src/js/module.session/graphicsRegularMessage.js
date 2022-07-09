function graphicsRegularMessage(params, msg) {
    const { elements } = params;
    const msgElemName = `regularMessage`;
    console.log(msg.timer)
    if (msg.running) {
        if (msg.timer === 0) {
            elements.gameCanvas.querySelector('.' + msgElemName).remove();
            delete elements[msgElemName];
        }
        return 
    };
    
    const element = elements[msgElemName] ? elements[msgElemName] : document.createElement("div");

    if (!elements[msgElemName]) {
        element.className = `regular-msg regularMessage`;
        elements.gameCanvas.appendChild(element);
        elements[msgElemName] = element;
    }
    element.innerHTML = `
        <div>${msg.message}</div>
        <small>${msg.spell.title}</small>
    `
};

export default graphicsRegularMessage;