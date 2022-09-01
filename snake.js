// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;
var speed = 1; 

var snakeBody = [];

// food
var foodX;
var foodY;

// Game
var score = 1;
var level;
var GameOver = false;
var updateTimer;

window.onload = function() {
	board = document.getElementById("board"); 
	board.height = rows * blockSize; 
	board.width = cols * blockSize; 
	context = board.getContext("2d"); // Used for drawing on the board
	level = document.getElementById("level");

	placefood();
	document.addEventListener("keyup", changeDirection);
	updateTimer = setInterval(update, 200/speed);	// 200ms
}

function update() {
	if (GameOver) {
		return;
	}
	context.fillStyle = "black";
	context.fillRect(0, 0, board.width, board.height);

	context.fillStyle = "red";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		score += 1;
		document.getElementById("score").innerHTML = score;
		placefood();
	}

	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	context.fillStyle = "yellow";
	snakeX += velocityX * blockSize;
	snakeY += velocityY * blockSize;
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	context.fillStyle = "lime";
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

	// Game Over Conditions
	if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
		GameOver = true;
		reportOver(speed); 
		return; 
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
			GameOver = true;
			alert("You have ate yourself!!! ");
			reportOver(speed); 
			return; 
		}
	}

	// Add Level Conditions
	document.getElementById("speed").innerHTML = speed; 
	if (score <= 20) {
		level.innerHTML = 1; 
		level.style = "color: blue;"; 
		speed = 1;
		clearInterval(updateTimer);
		updateTimer = setInterval(update, 200/speed);
	} else if (score > 20 && score <= 40) {
		level.innerHTML = 2;
		level.style = "color: green;";
		speed = 2;
		clearInterval(updateTimer);
		updateTimer = setInterval(update, 200/speed);
	} else if (score > 40 && score <= 70) {
		level.innerHTML = 3;
		level.style = "color: orange;";
		speed = 3;
		clearInterval(updateTimer);
		updateTimer = setInterval(update, 200/speed);
	} else if (score > 70 && score <= 150) {
		level.innerHTML = 4;
		level.style = "color: red;";
		speed = 4;
		clearInterval(updateTimer);
		updateTimer = setInterval(update, 200/speed);
	} else if (score > 150) {
		level.innerHTML = 5;
		level.style = "color: gold;";
		speed = 5;
		clearInterval(updateTimer);
		updateTimer = setInterval(update, 200/speed);
	}
}

function changeDirection(e) {
	if (e.code == "ArrowUp" && velocityY != 1) {
		velocityX = 0;
		velocityY = -1;
	} else if (e.code == "ArrowDown" && velocityY != -1) {
		velocityX = 0;
		velocityY = 1;
	} else if (e.code == "ArrowLeft" && velocityX != 1) {
		velocityX = -1;
		velocityY = 0;
	} else if (e.code == "ArrowRight" && velocityX != -1) {
		velocityX = 1;
		velocityY = 0;
	}
}

function placefood() {
	// (0 - 1) * cols/rows -> (0 - 19.9999) -> (0 - 19) * 25
	foodX = Math.floor(Math.random() * cols) * blockSize;
	foodY = Math.floor(Math.random() * rows) * blockSize;
	if (foodX == snakeX || foodY == snakeY) {
		placefood();
		return;
	}
	if (snakeBody) {
		for (let i = 0; i < snakeBody.length; i++) {
			if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1]) {
				placefood();
				return;
			}
		}
	}
}

function reportOver(s) {
	if (s == 1) {
		alert("弱爆了！！！"); 
	} else if (s == 2) {
		alert("。。。"); 
	} else if (s == 3) {
		alert("还不错嘛 "); 
	} else if (s == 4) {
		alert("NB. "); 
	} else if (s == 5) {
		alert("You are the SNAKE! "); 
	} else {
		alert("Error when reading data. ")
	}
	clearInterval(updateTimer);
	GameOver = false;
	speed = 1;
	snakeX = blockSize * 5; 
	snakeY = blockSize * 5; 
	snakeBody = [];
	velocityX, velocityY = 0, 0; 
	score = 1; 
	document.getElementById("score").innerHTML = score;
	level.innerHTML = 1;
	document.getElementById("speed").innerHTML = speed; 
	updateTimer = setInterval(update, 200/speed);
}