//Initiate canvas
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

//Controls Drawing
function introduction(){
	if(running==false){
		ctx.font = "20px Arial";
		ctx.fillText("Rules", canvas.width / 2 - 25, 25);
		ctx.font = "15px Arial";
		ctx.fillText("Eat food by moving your snake over a yellow square", 150, 45);
		ctx.fillText("By doing so, your snake will grow in length, and score a point.", 120, 65);
		ctx.fillText("Do not collide into your snake, and stay away from the game wall.", 110, 85);

		ctx.font = "15px Arial";
		ctx.fillText("Click to Start.", canvas.width / 2 - 45, 145);

		ctx.beginPath();	//Starting Point
		ctx.strokeStyle = "black";	//Fills rectangle with colour.
		ctx.strokeRect(canvas.width / 2 - 12, canvas.height / 2 + 25,25,25);	//Creates rectangle which can be filled, (x,y,width,height)
		ctx.strokeRect(canvas.width / 2 - 37, canvas.height / 2 + 50,25,25);
		ctx.strokeRect(canvas.width / 2 + 13, canvas.height / 2 + 50,25,25);
		ctx.closePath();	// Ends drawing point.

		ctx.font = "15px Arial";
		ctx.fillText("W", canvas.width / 2 - 8, canvas.height / 2 + 44);
		ctx.fillText("A", canvas.width / 2 - 30, canvas.height / 2 + 69);
		ctx.fillText("S", canvas.width / 2 - 5, canvas.height / 2 + 69);
		ctx.fillText("D", canvas.width / 2 + 20, canvas.height / 2 + 69);

		ctx.beginPath();	//Starting Point
		ctx.moveTo(canvas.width / 2 - 12,canvas.height / 2 + 75);	//Coordinates
		ctx.lineTo(canvas.width / 2 + 13,canvas.height / 2 + 75);
		ctx.stroke();	//Displays line
		ctx.closePath();	//Final Point

		// Controls Text
		ctx.font = "15px Arial";
		ctx.fillText("Tap a movement key (W,A,S,D) in whatever direction you wish to move in.", 80, 350 )

	} else {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
}

//Constants
const BOX = 20;
const WIDTH = 640;
const HEIGHT = 400;

canvas.width = WIDTH;
canvas.height = HEIGHT;

//Variables
var fps = 18;
var interval;
var scoreCount = 0;
var direction;
var running = false;
var over = false;
// var slowDown = 2;
// var slowD = -1;
// var slowMo = false;

//Arrays
var snakeList = [
	{x:BOX * 6, y: BOX * 6},
	{x:BOX * 5, y:BOX * 6},
	{x:BOX * 4, y:BOX * 6}
];
var foodList = [];

//Objects
var score = {
	x: canvas.width - 100,
	y: 25,
	colour: "red",

	print: function(){
		ctx.font = "18px Arial";
		ctx.fillStyle = score.colour;
		ctx.fillText("Score: " + scoreCount,score.x,score.y);
	}
}

var snake = {
	width: BOX,
	height: BOX,
	colour: "green",

	draw: function() {
		for(let i = 0; i < snakeList.length; i++){
			if(i==0){
				ctx.fillStyle = snake.colour;
			} else {
				ctx.fillStyle = "red";
			}
		ctx.fillRect(snakeList[i].x, snakeList[i].y, snake.width, snake.height);
		}
	}
}

var food = {
	x: Math.floor(parseInt((Math.floor(Math.random() * WIDTH))/BOX)*BOX), //Only spawn in increments of BOX
	y: Math.floor(parseInt((Math.floor(Math.random() * HEIGHT))/BOX)*BOX),
	width: BOX,
	height: BOX,
	colour: "yellow",

	draw: function(){
		ctx.fillStyle = food.colour;
		ctx.fillRect(food.x, food.y, food.width, food.height);
	}
}

// var matrix = {
// 	x: Math.floor(parseInt((Math.floor(Math.random() * WIDTH))/BOX)*BOX), //Only spawn in increments of BOX
// 	y: Math.floor(parseInt((Math.floor(Math.random() * HEIGHT))/BOX)*BOX),

// 	width: BOX,
// 	height: BOX,
// 	colour: "blue",

// 	draw: function(){
// 		ctx.fillStyle = matrix.colour;
// 		ctx.fillRect(matrix.x, matrix.y, matrix.width, matrix.height);
// 	}
// }

// eatMatrix = function(){
// 	if(snakeList[0].x == matrix.x && snakeList[0].y == matrix.y){
// 		slowD += 3;

// 		matrix.x = Math.floor(parseInt((Math.floor(Math.random() * WIDTH))/BOX)*BOX); 
// 		matrix.y = Math.floor(parseInt((Math.floor(Math.random() * HEIGHT))/BOX)*BOX);
// 	}

// 	if(scoreCount == slowD){
// 		fps = 8;
// 		clearInterval(interval);
// 		interval = setInterval(main, 1000/ fps);

// 		matrix.x = 0;
// 		matrix.y = 0;

// 		} else {
// 			fps = 18;
// 			clearInterval(interval);
// 			interval = setInterval(main, 1000/ fps);
// 		}
// 	}

// var penalty = {
	// x: Math.floor(parseInt((Math.floor(Math.random() * WIDTH))/BOX)*BOX), //Only spawn in increments of BOX
	// y: Math.floor(parseInt((Math.floor(Math.random() * HEIGHT))/BOX)*BOX),

	// 	x: food.x + BOX, //Only spawn in increments of BOX
	// y: food.y + BOX,

// 	x: food.x * (Math.round(Math.random()) * 2 - 1 * BOX),

// 	width: BOX,
// 	height: BOX,
// 	colour: "red",

// 	draw: function(){
// 		ctx.fillStyle = penalty.colour;
// 		ctx.fillRect(penalty.x, penalty.y, penalty.width, penalty.height);
// 	}
// }

//Functions
bounderies = function(){
	if(snakeList[0].x >= WIDTH){
		startGame();
	}
	if(snakeList[0].y >= HEIGHT){
		startGame();
	}
	if(snakeList[0].x < 0){
		startGame();
	}
	if(snakeList[0].y < 0){
		startGame();
	}
}

eat = function() {
	if(snakeList[0].x == food.x && snakeList[0].y == food.y){
		scoreCount++;

		food.x = Math.floor(parseInt((Math.floor(Math.random() * WIDTH))/BOX)*BOX); //Only spawn in increments of BOX
		food.y = Math.floor(parseInt((Math.floor(Math.random() * HEIGHT))/BOX)*BOX);

		snakeList.push({x:snakeList[1].x,y:snakeList[1].y}); //Have to specify where the new object is being placed within "Push" arguments
	
	}
}

//Controls
document.onkeydown = function(e){
		if(e.keyCode == 87 && direction !== "DOWN"){
			direction = "UP";
		}
		if(e.keyCode == 83 && direction !== "UP"){
			direction = "DOWN";
		}
		if(e.keyCode == 65 && direction !== "RIGHT"){
			direction = "LEFT";
		}
		if(e.keyCode == 68 && direction !== "LEFT"){
			direction = 'RIGHT';
		}
		if(e.keyCode == 32){
			slowMo = true;
		}
}

snakeMovement = function() {
	for(let i = snakeList.length-1; i>=0;i-- ){
		if(direction == "LEFT"){
			if (i==0){
				snakeList[i].x -= BOX;
			} else {
			snakeList[i].x = snakeList[i-1].x;
			snakeList[i].y = snakeList[i-1].y;
			}
		}
		if(direction == "RIGHT"){
			if (i==0){
				snakeList[i].x += BOX;
			} else {
			snakeList[i].x = snakeList[i-1].x;
			snakeList[i].y = snakeList[i-1].y;
			}
		}
		if(direction == "UP"){
			if (i==0){
				snakeList[i].y -= BOX;
			} else {
			snakeList[i].x = snakeList[i-1].x;
			snakeList[i].y = snakeList[i-1].y;
			}
		}
		if(direction == "DOWN"){
			if (i==0){
				snakeList[i].y += BOX;
			} else {
			snakeList[i].x = snakeList[i-1].x;
			snakeList[i].y = snakeList[i-1].y;
			}
		}
		if(slowMo == true){
			console.log(slowMo);
			fps = 8;
			clearInterval(interval);
			interval = setInterval(main, 1000/ fps);
		} 
	}
}

gameOver = function(){
	for(let i = 1; i < snakeList.length; i++){
		if(snakeList[0].x == snakeList[i].x && snakeList[0].y == snakeList[i].y){
			startGame();
		}
	}
}

main = function(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	if(running == false){
		introduction();
	}
	if(running == true){
		snake.draw();
		snakeMovement();
		food.draw();
		// penalty.draw();
		score.print();
		// if(slowDown == scoreCount){
		// 	matrix.draw();
		// }

		bounderies();
		eat();
		gameOver();
	}
}

startGame = function(){
	running = true;
	snakeList = [
		{x:BOX * 6, y: BOX * 6},
		{x:BOX * 5, y:BOX * 6},
		{x:BOX * 4, y:BOX * 6}
	];
	scoreCount = 0;
	fps = 18;

	if(running == true){
	clearInterval(interval);
	}	

	interval = setInterval(main, 1000/ fps);
}


canvas.addEventListener("click", startGame);

interval = setInterval(main, 1000/ fps);
