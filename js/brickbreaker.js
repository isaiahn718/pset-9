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
        else if (!boinker.up && boinker.y + boinker.radius >= blocks[j].y && boinker.y + boinker.radius < blocks[j].y + 12 && boinker.x >= blocks[j].x - boinker.radius && boinker.x < blocks[j].x + blocks[j].width + boinker.radius) {
          boinker.up = true;
          ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
          blocks.splice(j, 1);
          break;
        }
        else if (boinker.x + boinker.radius >= blocks[j].x && boinker.x + boinker.radius < blocks[j].x + 10 && boinker.y >= blocks[j].y - boinker.radius && boinker.y < blocks[j].y + blocks[j].height + boinker.radius) {
            boinker.right = false;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
        else if (boinker.x - boinker.radius <= blocks[j].x + blocks[j].width && boinker.x - boinker.radius > blocks[j].x + blocks[j].width - 10 && boinker.y >= blocks[j].y - boinker.radius && boinker.y < blocks[j].y + blocks[j].height + boinker.radius) {
            boinker.right = true;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
    }

    if (boinker.y + boinker.radius == user.y) {
        let a = 3;
        const speed_change_change = a / 25;
        for (let i = 2; i <= 100; i += 2) {
            if (boinker.x >= user.x - boinker.radius + i - 2 && boinker.x < user.x - boinker.radius + i) {
                if (i < 50) {
                    boinker.up = true;
                    boinker.right = false;
                    speed = (speed >= 11) ? speed = 11 : speed + 0.5;
                    speed_change = Math.abs(a);
                }
                else if (i >= 50) {
                    boinker.up = true;
                    boinker.right = true;
                    speed = (speed >= 11) ? speed = 11 : speed + 0.5;
                    speed_change = Math.abs(a);
                }
                break;
            }
            else {
                a -= speed_change_change;
            }
        }
    }

    if (user.x + user.width > canvas.width) {
        user.movement = 0;
        user.x = canvas.width - user.width;
    }
    else if (user.x < 0) {
        user.movement = 0;
        user.x = 0;
    }
    else {
        user.movement = 20;
    }
}
function draw() {
    ctx.strokeRect(user.x, user.y, user.width, user.height);
    ctx.beginPath();
    ctx.arc(boinker.x, boinker.y, boinker.radius, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < blocks.length; i++) {
        ctx.strokeRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
    }
}
function getArrowKeys(event) {
    if (start) {
        if (event.keyCode == 37) {
            moveuser(-1 * user.movement);
        }
        else if (event.keyCode == 39) {
            moveuser(user.movement);
        }
    }
}
function moveuser(pixels) {
    user.x += pixels;
}
function createblocks() {
    for (let y = 0; y <= 80; y += 40) {
        for (let x = 0; x < canvas.width; x += canvas.width / 10) {
            let bottleTemplate = {
                x: x,
                y: y,
                width: canvas.width / 10,
                height: 40
            };
            blocks.push(bottleTemplate);
        }
    }
}
function lose() {
    init();
}
function win() {
  start = false;
  wins += 1
  counter.innerHTML = wins
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2.5;
  ctx.textAlign = "center";
  ctx.font = "60px Arial";
  ctx.fillText("You Win!", canvas.width/2, (canvas.height/2) - 40);
}
