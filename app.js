/*-------------------------------- Constants --------------------------------*/
const winningCombos = [ 
  [0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10], 
  [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], 
  [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], 
  [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], 
  [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], 
  [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], 
  [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], 
  [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], 
  [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], 
  [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10], 
  [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], 
  [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31], 
  [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], 
  [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22], 
  [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], 
  [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], 
  [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], 
  [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
  [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], 
  [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], 
  [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], 
  [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], 
  [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34] 
  ];  
/*---------------------------- Variables (state) ----------------------------*/
let isWinner, playerTurn, boardSlots
/*------------------------ Cached Element References ------------------------*/
const slots = document.querySelectorAll('.board > div')

const resultMessage = document.querySelector('#message')

// const resetBtn = document.querySelector('#reset-button')
// console.log(resetBtn); commenting out until game is working
/*----------------------------- Event Listeners -----------------------------*/

slots.forEach(slot => slot.addEventListener('click', function(event) {
  handleClick(event);
}))

/*-------------------------------- Functions --------------------------------*/

init();
function init() {
  // resetBtn.setAttribute('hidden', 'true')
  boardSlots = [
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
  ]
  playerTurn = 1;
  isWinner = null;
  render();
  
}


function render() {
  boardSlots.forEach(function (slot, idx) {
    let slotColor
    if (slot === 1) {
      slotColor = '#f63726'
    } else if (slot === -1) {
      slotColor = '#f9dc01'
    } else if (slot === null) {
      slotColor = 'white'
    }
    slots[idx].style.backgroundColor = slotColor
  })
  changeMessage(); 
  console.log(isWinner);
}

function handleClick(event) {
  // resetBtn.removeAttribute('hidden')
  let index = event.target.id;
  if (boardSlots[index] !== null) return;
  if (isWinner !== null) return;
  boardSlots[index] = playerTurn;
  playerTurn = playerTurn * -1;
  getWinner();
}




function changeMessage() {
  if (isWinner === null) {
    if (playerTurn === 1) resultMessage.textContent = 'Player one\'s turn!'
    if (playerTurn === -1) resultMessage.textContent = 'Player two\'s turn!'
  } else if (isWinner === 'T') {
    resultMessage.textContent = 'Tie! Select replay to play again!'
  } else if (isWinner === '1') {
    resultMessage.textContent = 'Payer one has won the game!'
  } else if (isWinner === '-1') {
    resultMessage.textContent = 'Player two has won the game!'
  }
}

function getWinner() {
  render()
  winningCombos.forEach(combo => {
    if(Math.abs(boardSlots[combo[0]] + boardSlots[combo[1]] + boardSlots[combo[2]] + boardSlots[combo[3]]) === 4) {
      isWinner = boardSlots[combo[0]];
      changeMessage();
    }
  })
  let tieGame = boardSlots.some(num => num === null)
  if (tieGame === false && isWinner !== 1 && isWinner !== -1) {
    isWinner = 'T'
    changeMessage();
  }
}

