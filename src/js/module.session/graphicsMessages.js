function graphicsMessages(params) {
  const { elements, config, me } = params;
  const arcanes = params.state.resources.arcanes;
  const battlefieldRect = elements.battlefield.getBoundingClientRect();
  const dimensions = elements.battlefield
    .querySelector(".circle")
    .getBoundingClientRect();

  let element = elements.gameCanvas.querySelector(".messagesinfo");
  if (!element && me.messages.length) {
    element = document.createElement("div");

    element.className = `messagesinfo`;
    element.dataset.messagesinfo = "messagesInfo";

    element.style.top = dimensions.height * 2 + 5 + "px";
    element.style.left = dimensions.width + 5 + "px";
    element.style.width =
      battlefieldRect.width - 20 - dimensions.width * 2 + "px";

    elements.gameCanvas.appendChild(element);
  }

  if (element && element.childElementCount < me.messages.length) {
    const line = document.createElement("div");
    const lastMess = me.messages[me.messages.length - 1];

    line.className = `mess-item`;
    line.innerHTML = /*html*/`
        <span class="title">${lastMess}</span>
    `;
    element.appendChild(line);
    console.log(me.messages.length, lastMess)
  }

  if (element && !me.messages.length) {
    return element.remove();
  }

}

export default graphicsMessages;
