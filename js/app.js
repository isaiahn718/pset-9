///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let x_wins_count = 0
let o_wins_count = 0
let switch_turn_count = 0
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;

document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("switch").onclick = switch_turn;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  if (switch_turn_count == 0) {
    turn = "X";
  }
  else if (switch_turn_count == 1) {
    turn = "O"
  }
  win = null;

  render();
}
function switch_turn() {
  if (switch_turn_count == 0) {
    switch_turn_count = 1
  }
  else if (switch_turn_count == 1) {
    switch_turn_count = 0
  }
}
function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });
  if (win === "X") {
    x_wins_count = x_wins_count + 1
  }
  else if (win === "O") {
    o_wins_count = o_wins_count + 1
  }
  x_wins.innerHTML = x_wins_count
  o_wins.innerHTML = o_wins_count
  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}
function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      render();
    }
  }
<<<<<<< HEAD
  if (board[0] && board[0] === board[1] && board[1] === board[2]) {
    win = board[0];   // either X or O
  } else if (/* next winning condition */) {
    win = board[0];   // either X or O
  }
=======
}
function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}
>>>>>>> d87ece205f9ea9ba0959e6acc9c4aee759af1b50
