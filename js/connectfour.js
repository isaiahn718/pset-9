///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [14, 15, 16 ,17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [7, 8, 9 ,10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [35, 28, 21, 14],
  [28, 21, 14, 7],
  [21, 14, 7, 0],
  [36, 29, 22, 15],
  [29, 22, 15, 8],
  [22, 15, 8, 1],
  [37, 30, 23, 16],
  [30, 23, 16, 9],
  [23, 16, 9, 2],
  [38, 31, 24, 17],
  [31, 24, 17, 10],
  [24, 17, 10, 3],
  [39, 32, 25, 18],
  [32, 25, 18, 11],
  [25, 18, 11, 4],
  [40, 33, 26, 19],
  [33, 26, 19, 12],
  [26, 19, 12, 5],
  [41, 34, 27, 20],
  [34, 27, 20, 13],
  [27, 20, 13, 6],
  [38, 32, 26, 20],
  [37, 31, 25, 19],
  [36, 30, 24, 18],
  [35, 29, 23, 17],
  [31, 25, 19, 13],
  [30, 24, 18, 12],
  [29, 23, 17, 11],
  [28, 22, 16, 15],
  [24, 18, 12, 6],
  [23, 17, 11, 5],
  [22, 16, 10, 4],
  [21, 15, 9, 2],
  [41, 33, 25, 17],
  [40, 32, 24, 16],
  [39, 31, 23, 15],
  [38, 30, 22, 14],
  [34, 26, 18, 10],
  [33, 25, 27, 9],
  [32, 24, 26, 8],
  [31, 23, 25, 7],
  [27, 19, 11, 3],
  [26, 18, 10, 2],
  [25, 17, 9, 1],
  [24, 16, 8, 0]
];


///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let red_wins = 0;
let yellow_wins = 0;
let ties = 0;
let first = "Red";
let winner;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const circle = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("redFirst").onclick = redFirst;
document.getElementById("yellowFirst").onclick = yellowFirst;
document.getElementById("reset-scoreboard").onclick = resetScoreboard;
///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = [
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
  ];

  board.forEach(function(mark, index) {
    if (circle[index].classList.contains("Red")) {
      circle[index].classList.remove("Red")
    }
    if (circle[index].classList.contains("Yellow")) {
      circle[index].classList.remove("Yellow")
    }
  });

  turn = "Red"
  win = null

  if (first === "Red") {
    turn = "Red"
  }
  else if (first === "Yellow") {
    turn = "Yellow"
  }

  render();
}


function render() {
  board.forEach(function(mark, index) {
    circle[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {

 if (e.target.id == "board") {
    return false;
  }

if (!win) {
let index = circle.findIndex(function(circle) {
  return circle === e.target;
});


let row1 = index % 7;

if (board[index] === "") {

  while (board[index + 7] === "") {
    let i = index + 7;
    document.getElementById("circle" + i + "").classList.add(turn);
    board[i] = turn;
    document.getElementById("circle" + index + "").classList.remove(turn);
    board[index] = "";
    index = i;

  }
  if (board[index] === "") {
    document.getElementById("circle" + index + "").classList.add(turn);
    board[index] = turn;

  }

  }
  else if (board[index] !== "") {
    if (board[row1] === "") {
      while (board[row1 + 7] === "") {
        let i = row1 + 7;
        document.getElementById("circle" + i + "").classList.add(turn);
        board[i] = turn;
        document.getElementById("circle" + row1 + "").classList.remove(turn);
        board[row1] = "";
        row1 = i;

      }
      if (board[row1] === "") {
        document.getElementById("circle" + row1 + "").classList.add(turn);
        board[row1] = turn;

      }

    }
    else if (board[row1] !== "") {
      return false;
    }
   }



  turn = turn === "Red" ? "Yellow" : "Red";
  win = getWinner();
  if (win === "T") {
    ties++;
    document.getElementById("tie_score").innerHTML = ties;
  }

  render();
}
}


function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]] &&
      board[condition[2]] === board[condition[3]]
    ) {
      winner = board[condition[0]];
      if (winner === "Red") {
        red_wins++;
        document.getElementById("red_score").innerHTML = red_wins;

      }
      else if (winner === "Yellow") {
        yellow_wins++;
        document.getElementById("yellow_score").innerHTML = yellow_wins;

      }

    }

  });

  return winner ? winner : board.includes("") ? null : "T";
}

function playAgain() {
  board.forEach(function(mark, index) {
    if (circle[index].classList.contains("Red")) {
      circle[index].classList.remove("Red")
    }
    if (circle[index].classList.contains("Yellow")) {
      circle[index].classList.remove("Yellow")
    }
  });
  init()
}

function resetScoreboard() {
  red_wins = 0;
  yellow_wins = 0;
  ties = 0;

  document.getElementById("red_score").innerHTML = red_wins;
  document.getElementById("tie_score").innerHTML = ties;
  document.getElementById("yellow_score").innerHTML = yellow_wins;
}

function redFirst(){
  init();

  document.getElementById("switch").innerHTML = "Turn: Red";
  turn = "Red";
  first = "Red"


}

function yellowFirst(){
  init();

  document.getElementById("switch").innerHTML = "Turn: Yellow";
  turn = "Yellow";
  first = "Yellow"

}

function resetScoreboard() {
    red_wins = 0;
    yellow_wins = 0;
    ties = 0;

    document.getElementById("red_score").innerHTML = red_wins;
    document.getElementById("tie_score").innerHTML = ties;
    document.getElementById("yellow_score").innerHTML = yellow_wins;
  }
