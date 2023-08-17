function graphicsArcaneInfo(params) {
  const { elements, config, me } = params;
  const arcanes = params.state.resources.arcanes;
  const battlefieldRect = elements.battlefield.getBoundingClientRect();
  const dimensions = elements.battlefield
    .querySelector(".circle")
    .getBoundingClientRect();

  let element = elements.gameCanvas.querySelector(".arcane-info");
  if (!element && me.arcanes.length) {
    element = document.createElement("div");

    element.className = `arcane-info`;
    element.dataset.arcaneinfo = "arcaneInfo";

    element.style.top = dimensions.height + 5 + "px";
    element.style.left = dimensions.width + 5 + "px";
    element.style.width =
      battlefieldRect.width - 20 - dimensions.width * 2 + "px";

    elements.gameCanvas.appendChild(element);
  }

  if (element && element.childElementCount < me.arcanes.length) {
    const arcane = document.createElement("div");
    const lastArcane = arcanes[me.arcanes[me.arcanes.length - 1]];

    arcane.className = `arcane-item`;
    arcane.innerHTML = /*html*/`
        <span class="sign">${lastArcane.rune}</span>
        <span class="title">${lastArcane.title}</span>
    `;
    element.appendChild(arcane);
    console.log(arcane)
  }

  if (element && !me.arcanes.length) {
    return element.remove();
  }

}

export default graphicsArcaneInfo;
