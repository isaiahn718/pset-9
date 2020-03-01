var canvas = document.getElementById("canvas_for_game");
	var ctx = canvas.getContext("2d");
  var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width-paddleWidth)/2;
	var rightPressed = false;
	var leftPressed = false;
	var brickRowCount = 4;
	var brickColumnCount = 9;
	var brickWidth = 70;
	var brickHeight = 20;
	var brickPadding = 15;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;
	var brickColor = "blue";
	var ballRadius = 10;
	var ballColor = "black"
	var speed = 10;
	var x = canvas.width/2;
	var y = canvas.height-30;
	var lives = 3
	var dx = 2;
	var dy = -2;
	var px = 7;


	var bricks = [];
	for(c = 0; c < brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0, status: 1 };
		}
	}

	var score = 0;


	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fillStyle = ballColor;
		ctx.fill();
		ctx.closePath();
	}

	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
	}

	function drawBricks() {
		for(c = 0; c < brickColumnCount; c++) {
			for(r = 0; r < brickRowCount; r++) {
				if(bricks[c][r].status == 1) {
					var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
					var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
					bricks[c][r].x = brickX;
					bricks[c][r].y = brickY;

					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fillStyle = brickColor;
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}

	function keyDownHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = true;
		}
		else if(e.keyCode == 37) {
			leftPressed = true;
		}
	}

	function keyUpHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = false;
		}
		else if(e.keyCode == 37) {
			leftPressed = false;
		}
	}

	function collisionDetection() {
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				var b = bricks[c][r];
				if(b.status == 1) {
					if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
						dy = -dy;
						b.status = 0;
						score++;

						if(score == brickRowCount*brickColumnCount) {
							alert("Great Job! You win!");
							document.location.reload();
						}
					}
				}
			}
		}
	}

	function drawScore() {
		ctx.font = "22px Georgia";
		ctx.fillStyle = "Black";
		ctx.fillText("Bricks Broken: "+score, 338, 20);
	}

	function drawLives() {
  ctx.font = "22px Lato";
  ctx.fillStyle = "black";
  ctx.fillText("Lives: "+lives, 638, 23);
}


	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		drawBricks();
		drawBall();
		drawPaddle();
		collisionDetection();
		drawScore();
		drawLives();

		x += dx;
		y += dy;

		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
			ballColor = getRandomColor();
		}
		if(y + dy < ballRadius) {
			dy = -dy;
		} else if(y + dy > canvas.height-ballRadius) {
			if(x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
			}
			else {
				{
				    lives--;
				 if(!lives) {
				        alert("Game Over. Try Again!");
				        document.location.reload();
				      } else {
				        x = canvas.width/2;
				        y = canvas.height-30;
				        dx = 3;
				        dy = -3;
				        paddleX = (canvas.width-paddleWidth)/2;
				      }
			}
		}
	}

		if(rightPressed && paddleX < canvas.width-paddleWidth) {
			paddleX += px;
		}
		else if(leftPressed && paddleX > 0) {
			paddleX -= px;
		}

		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}

		if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
			dy = -dy;
		}
	}

	setInterval(draw, speed);
