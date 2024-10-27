import './style.css'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4005')

const playersElement = document.getElementById('players')
const spellsElement = document.getElementById('spells')
const characterElement = document.getElementById('character')

let clientData = null;

console.log('1323123')
console.log('1323123')
console.log('1323123')
console.log('1323123')


// {
//   "x": 0,
//   "y": 0,
//   "width": 35,
//   "height": 35,
//   "pos": 12,
//   "idle": true,
//   "arcanes": [],
//   "lastUsedArcanes": [],
//   "spells": [],
//   "effects": [],
//   "portrait": "/images/portrait/portrait23.png",
//   "messages": [
//       "start"
//   ],
//   "meta": {
//       "name": {
//           "name": "Player695",
//           "pin": "1111"
//       },
//       "socket": "5rbTlNbhysfLSXMEAAAN"
//   },
//   "baseHealth": 100,
//   "actualHealth": 100,
//   "affectedHealth": 100
// }

let myPlayerData = null;
let gameData = {};
let actionQueue = [];

socket.on('connect', () => {
  console.log('Connected to server')
  // Emit join request immediately upon connection
  socket.emit('join-request', { name: 'Player' + Math.floor(Math.random() * 1000), pin: '1111' }, handleJoinResponse)
})

// Listen for player updates
// socket.on('player-update', updatePlayers)

// Listen for game tick updates
socket.on('ticker-tick', handleTickerTick)

// Handle the response from the join request
function handleJoinResponse(response) {
  if (response.error) {
    console.error(response.error)
    return
  }
  clientData = response
  console.log(11111)
  console.log(clientData)
  createSpellButtons()
}

// Update the players list in the UI
function updatePlayers() {
  const players = gameData
  playersElement.innerHTML = `
    <h2>Players</h2>
    <div class="player-container my-player">
      <strong>${myPlayerData.meta.name.name}</strong><br />
      <strong>${myPlayerData.affectedHealth} / ${myPlayerData.actualHealth}</strong>
      <strong>pos:${myPlayerData.pos}</strong><br />
    </div>
  `
  // Filter out the current player and map the remaining players to HTML
  const playerHTML = Object.keys(players)
      .filter(socket => socket !== clientData.socket) // Filter out the current player
      .map(socket => {
          const player = players[socket];
          return `
            <div class="player-container">
              <span>${player.meta.name.name}</span><br />
              <span>${player.affectedHealth} / ${player.actualHealth}</span><br />
              <span>pos: ${player.pos}</span><br />
            </div>
          `;
      })
      .join(''); // Join the array of HTML strings into a single string

  // Update the playersElement with the generated HTML
  playersElement.innerHTML += playerHTML;
}

// // Handle game tick updates (this function needs to be defined based on your game logic)
function handleTickerTick(data) {
  gameData = data.data;
  myPlayerData = gameData[clientData.socket];
  updatePlayers();

  if (actionQueue.length) {
    const action = actionQueue.shift(); // Get the first action
    socket.emit('ticker-tick-request', [action]); // Send the action to the server
  }


  // session.act(state, { title: 'magicStarted' })
  // session.act(state, { title: 'magicArcaneSet', value: currentArcane })
  // session.act(state, {
  //   title: 'magicProcessSetTarget',
  //   value: {
  //       target: e.event.target.dataset.target,
  //       spellIndex: lastSpell.spellIndex,
  //   }
  // });
  // session.act(state, { title: 'magicProcessSuccess' });
  // session.act(state, { title: 'magicProcessBraker' });
  console.log(1111, myPlayerData.meta.name.name, 1111)
  console.log(JSON.stringify(myPlayerData, undefined, 4))

}

// Function to create spell buttons (this function needs to be defined based on your game logic)
function createSpellButtons() {
  const spells = [
    { name: 'moveLeft', title: 'Move Left' },
    { name: 'moveRight', title: 'Move Right' },
    { name: 'jumpLeft', title: 'Jump Left' },
    { name: 'jumpRight', title: 'Jump Right' },
    { name: 'fireball', title: 'Cast Fireball' }
  ]

  spellsElement.innerHTML = '<h2>Available Spells</h2>'
  spells.forEach(spell => {
    const button = document.createElement('button')
    button.textContent = spell.title
    button.onclick = () => castSpell(spell.name)
    spellsElement.appendChild(button)
  })
}

function castSpell(spellName) {
  actionQueue.push({ title: 'magicStarted' })
  // actionQueue.push({ title: 'magicArcaneSet', value: '2' }
  actionQueue.push({ title: 'magicArcaneSet', value: '3' })
  actionQueue.push({ title: 'magicArcaneSet', value: '6' })
  actionQueue.push({ title: 'magicArcaneSet', value: '7' })
  actionQueue.push({ title: 'magicProcessSuccess' })
}