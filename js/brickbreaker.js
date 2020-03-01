
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
function game() {
    if (start) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        checkCollision();
        changeDirection();
        if (blocks.length === 0) {
            win();
        }
    }
    setTimeout(game, 20 - speed);
}
function changeDirection() {
    if (boinker.right) {
        speed = 3 * speed_change;
    }
    else {
        speed = -3 * speed_change;
    }
    if (boinker.up) {
        dy = -3;
    }
    else {
        dy = 3;
    }
    boinker.x += speed;
    boinker.y += dy;
}
function checkCollision() {
    if (boinker.x - boinker.radius <= 0) {
        boinker.right = true;
    }
    if (boinker.x + boinker.radius >= canvas.width) {
        boinker.right = false;
    }
    if (boinker.y - boinker.radius <= 0) {
        boinker.up = false;
    }
    if (boinker.y - boinker.radius >= canvas.height) {
        lose();
    }

    for (let j = 0; j < blocks.length; j++) {
        if (boinker.y - boinker.radius <= blocks[j].y + blocks[j].height && boinker.y - boinker.radius > blocks[j].y + blocks[j].height - 5 && boinker.x >= blocks[j].x - boinker.radius && boinker.x < blocks[j].x + blocks[j].width + boinker.radius) {
            boinker.up = false;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
