function graphicsCellPositioning(params) {
  const { elements, config } = params;
  const numSquares = config.battlefieldSize;
  const battlefieldRect = elements.battlefield.getBoundingClientRect();
  const dimensions = elements.battlefield.querySelector('.circle').getBoundingClientRect();
  const turn = Math.ceil(numSquares / 4) - 1;
  let targetIndex = 0;

  const newSquare = (nTop, nLeft, startTop, startLeft) => {
    const square = document.createElement("div");
      
    square.className = `circle circle-${targetIndex + 1}`;
    square.dataset.target = targetIndex;
    elements.battlefield.appendChild(square);
    
    ++targetIndex;

    square.style.top = startTop + nTop * dimensions.height + 'px';
    square.style.left = startLeft + nLeft * dimensions.width  + 'px';
    square.style.width = battlefieldRect.width / (turn + 1) + 'px';
    square.style.height = battlefieldRect.height / (turn + 3) + 'px';
  };

  elements.battlefield.innerHTML = "";

  for (let i = 0; i <= turn; i++) {
    if (targetIndex <= numSquares) newSquare(0, i, 0, 0);
  }  
  for (let i = 0; i <= turn; i++) {
    if (targetIndex <= numSquares) newSquare(i, 0, dimensions.height, dimensions.width * turn);
  }
  for (let i = 0; i <= turn; i++) {
    if (targetIndex <= numSquares) newSquare(0, -i,  dimensions.height * (turn + 2), dimensions.width * turn);
  }
  for (let i = 0; i <= turn; i++) {
    if (targetIndex <= numSquares) newSquare(-i, 0, dimensions.height * (turn + 1), 0);
  }  



  /**return;
  for (let line = 0; line <= turn; line++) {
    const lineSize = line === 0 || line === turn ? turn : 1;
    for (let i = 0; i <= lineSize; i++) {
      const square = document.createElement("div");
      
      square.className = `circle circle-${targetIndex + 1}`;
      square.dataset.target = targetIndex;
      elements.battlefield.appendChild(square);
      
      const dimensions = square.getBoundingClientRect();
      
      ++targetIndex;

      // square && (square.style.left = `${((position.x) / width) * 100}%`);
      // square && (square.style.top = `${((position.y) / height) * 100}%`);
      // square && (square.style.left = `${((position.x - dimensions.width / 2) / width) * 100}%`);
      // square && (square.style.top = `${((position.y - dimensions.height / 2) / height) * 100}%`);
      // square.style.left = `${((dimensions.width / 2 + position.x) / width) * 100}%`;
      // square.style.top = `${((dimensions.height / 2 + position.y) / height) * 100}%`;
      square.style.top = line * dimensions.height + 'px';
      square.style.left = i * dimensions.width  + 'px'
      if ((i + 1) % 5 === 0) {
        // Perform an action every five iterations
        console.log("Action performed at index:", i);
      }
    }
  }

  const polygonVertices = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];
  const polygonPerimeter = calculatePolygonPerimeter(polygonVertices);
  const distance = polygonPerimeter / numSquares; // Calculate the distance between each square

  // Function to calculate the perimeter of the polygon
  function calculatePolygonPerimeter(vertices) {
    let perimeter = 0;
    for (let i = 0; i < vertices.length; i++) {
      const currentVertex = vertices[i];
      const nextVertex = vertices[(i + 1) % vertices.length]; // Wrap around to the first vertex for the last edge
      const dx = nextVertex.x - currentVertex.x;
      const dy = nextVertex.y - currentVertex.y;
      perimeter += Math.sqrt(dx * dx + dy * dy);
    }

    return perimeter - (circle.height + 10);
  }

  // Function to get the position along the polygon given a distance from the starting vertex
  function getPositionAlongPolygon(polygonPerimeter, distance, vertices) {
    let currentDistance = 0;
    for (let i = 0; i < vertices.length; i++) {
      const currentVertex = vertices[i];
      const nextVertex = vertices[(i + 1) % vertices.length]; // Wrap around to the first vertex for the last edge
      const dx = nextVertex.x - currentVertex.x;
      const dy = nextVertex.y - currentVertex.y;
      const edgeLength = Math.sqrt(dx * dx + dy * dy);

      if (currentDistance + edgeLength >= distance) {
        const t = (distance - currentDistance) / edgeLength;
        const x = currentVertex.x + t * dx;
        const y = currentVertex.y + t * dy;
        return { x, y };
      }

      currentDistance += edgeLength;
    }

    return vertices[0]; // Fallback to the first vertex if the distance exceeds the perimeter
  }

  elements.battlefield.innerHTML = "";

  // Iterate over the number of squares and position them along the border
  for (let i = 0; i <= numSquares; i++) {
    const position = getPositionAlongPolygon(
      polygonPerimeter,
      distance * i,
      polygonVertices
    );
    // const square = elements.battlefield.querySelector(
    //     `.circle.circle-${i + 1}`
    //   );

    const square = document.createElement("div");
    square.className = `circle circle-${i + 1}`;
    square.dataset.target = i;
    elements.battlefield.appendChild(square);

    const dimensions = square.getBoundingClientRect();
    console.log(i);
    console.log(position.y);
    // square && (square.style.left = `${((position.x) / width) * 100}%`);
    // square && (square.style.top = `${((position.y) / height) * 100}%`);
    square &&
      (square.style.left = `${
        ((position.x - dimensions.width / 2) / width) * 100
      }%`);
    square &&
      (square.style.top = `${
        ((position.y - dimensions.height / 2) / height) * 100
      }%`);
    // square.style.left = `${((dimensions.width / 2 + position.x) / width) * 100}%`;
    // square.style.top = `${((dimensions.height / 2 + position.y) / height) * 100}%`;
    // square.style.left = position.x + "px";
    // square.style.top = position.y + "px";
  }**/
}

export default graphicsCellPositioning;
