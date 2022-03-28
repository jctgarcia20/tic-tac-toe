/*----- constants -----*/
const lookup = {
    '1': 'BLUE',
    '-1': 'RED',
    'null': 'WHITE'
};
  
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
  
/*----- app's state (variables) -----*/
let board, turn, winner;
  
/*----- cached element references -----*/
const squares = document.querySelectorAll('td div');
const message = document.querySelector('h1');
  
/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);
  
/*----- functions -----*/
  
initialize();
  
function handleMove(evt) {
    const idx = parseInt(evt.target.id.replace('sq', ''));
    if (board[idx] || winner) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}
  
function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
      if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
}
    if (board.includes(null)) return null;
    return 'T';
}
  
function render() {
    board.forEach(function(sq, idx) {
      squares[idx].style.background = lookup[sq];
    });
    if (winner === 'T') {
      message.innerHTML = 'EVENLY MATCHED!!! 👿';
    } else if (winner) {
      message.innerHTML = `CONGRATS ${lookup[winner].toUpperCase()}! YOU ARE THE WINNER 🏆🎉`;
    } else {
      message.innerHTML = `${lookup[turn].toUpperCase()}'S TURN`;
    }
}
  
function initialize() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
}