
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let counter = document.getElementById("wins")
let speed;
ctx.strokeStyle = "blue";
let speed_change;
let start = false;
let blocks = [];
let wins = 0;
let user = {
    x: (canvas.width / 2) - 40,
    y: canvas.height - 10,
    width: 80,
    height: 5,
    movement: 20
};
let boinker = {
    x: undefined,
    y: undefined,
    radius: 10,
    right: true,
    up: true
};
window.onload = function() {
    document.getElementById("reset-button").onclick = init;
    document.getElementById("game").onclick = init;
    game();
}
document.addEventListener("keydown", getArrowKeys);
function init() {
    boinker.x = canvas.width / 2;
    boinker.y = canvas.height - 20;
    boinker.right = true;
    boinker.up = true;
    user.x = (canvas.width / 2) - 40;
    user.y = canvas.height - 10;
    speed_change = 1;
    speed = 0;
    blocks = [];
    createblocks();
    start = true;
}
