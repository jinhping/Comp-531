var car = document.getElementById("car");
var cxt = car.getContext("2d");
var score = document.getElementById("score")
var gameSpeed = 20;
var tmp_speed;
var points = 0;
var x;
var y;
var startingPostion = {x, y};
startingPostion.x = 200
startingPostion.y = 600

cxt.fillStyle = 'green';
cxt.fillRect(200, 600, 100, 100);

var blocks = [[],[],[],[],[]];


var s = 0;
var gameOver = false;

start();

setTimeout(myfunction, tmp_speed);

function myfunction() {

	moveblock();
	scorePoints();
	if (gameOver == true) {
		return;
	}
	s += 2;
	if (s % 300 == 0) {
		var block1 = Math.random() < 0.5 ? 0 : 1;
		var block2 = Math.random() < 0.5 ? 0 : 1;
		var block3 = Math.random() < 0.5 ? 0 : 1;
		var block4 = Math.random() < 0.5 ? 0 : 1;
		var block5 = (block1 + block2 + block3 + block4) == 4 ? 0: 1;
		blocks[0].push({x_coordinate: 0, y_coordinate: 0, block : block1});
		blocks[1].push({x_coordinate:100, y_coordinate:0, block :block2});
		blocks[2].push({x_coordinate:200,y_coordinate:0, block :block3});
		blocks[3].push({x_coordinate:300,y_coordinate:0, block :block4});
		blocks[4].push({x_coordinate:400, y_coordinate:0, block :block5});
		paint_blocks(blocks);
		
	}
	setTimeout(myfunction, tmp_speed);
}


function moveblock() {
	for (var i = 0; i < blocks.length; i++) {
		for (var j = 0; j < blocks[0].length; j++) {
			
			if ( blocks[i][j].block == 1) {
				cxt.clearRect(blocks[i][j].x_coordinate,blocks[i][j].y_coordinate,100,100)
				cxt.fillStyle = "red"
				cxt.fillRect(blocks[i][j].x_coordinate,blocks[i][j].y_coordinate + 2,100,100)
			}
			blocks[i][j].y_coordinate += 2;
		}
	}
}

function scorePoints() {
		if (blocks[0][0].y_coordinate >= 700) {
			if (tmp_speed == gameSpeed) {
				points += tmp_speed;
			} else if (tmp_speed < gameSpeed) {
				points += gameSpeed * 2;
			} else if (tmp_speed > gameSpeed) {
				points += gameSpeed / 2;
			}
			score.innerHTML = "Score: " + points;
			for (var i = 0; i < blocks.length; i++) {
				var j = blocks[i].shift();
				if (j.block != 0) {
					cxt.clearRect(j.x_coordinate, j.y_coordinate, 100, 100)
				}
			}
		}
		
		if (blocks[startingPostion.x / 100][0].block == 1) {
			if (blocks[startingPostion.x / 100][0].y_coordinate + 100 >= startingPostion.y) {
				alert("Game Over")
				//clearInterval(interval)	
				gameOver = true;
				return
			}
		}
}

function start() {
	tmp_speed = gameSpeed

	document.onkeyup = function() {
		
//	clearInterval(interval)
					console.log("222222")

		tmp_speed = gameSpeed
	//	interval = setInterval(myfunction, tmp_speed);
	}

	document.onkeydown = function(e) {
		//move to the right
		if (e.keyCode == 39) {
			console.log("rrrrr")
			if (startingPostion.x < 400) {
				cxt.clearRect(startingPostion.x, startingPostion.y, 100, 100);
				cxt.fillStyle = "green"
				cxt.fillRect(startingPostion.x + 100, startingPostion.y, 100, 100);
				startingPostion.x = startingPostion.x + 100;
			} 
		} else if (e.keyCode == 37) {  // move to the left
						console.log("lllllll")

			if (startingPostion.x >= 100) {
				cxt.clearRect(startingPostion.x, startingPostion.y, 100, 100);
				cxt.fillStyle = "green"
				cxt.fillRect(startingPostion.x - 100, startingPostion.y, 100, 100);
				startingPostion.x = startingPostion.x -  100;
			}
		} else if (e.keyCode == 38) { // move up which half the speed
						console.log("uuuuuu")
			//	clearInterval(interval)
			
			tmp_speed = gameSpeed * 2;
		//	intervalu = setInterval(myfunction, tmp_speed);
		} else if (e.keyCode == 40) { 
						console.log("dddddd")
//	clearInterval(interval)

			tmp_speed = gameSpeed / 2;
	//		intervald = setInterval(myfunction, tmp_speed);
		}
	}
	var block1 = Math.random() < 0.5 ? 0 : 1;
	var block2 = Math.random() < 0.5 ? 0 : 1;
	var block3 = Math.random() < 0.5 ? 0 : 1;
	var block4 = Math.random() < 0.5 ? 0 : 1;
	var block5 = (block1 + block2 + block3 + block4) == 4 ? 0: 1;
	blocks[0].push({x_coordinate: 0, y_coordinate: 0, block : block1});
	blocks[1].push({x_coordinate:100, y_coordinate:0, block :block2});
	blocks[2].push({x_coordinate:200,y_coordinate:0, block :block3});
	blocks[3].push({x_coordinate:300,y_coordinate:0, block :block4});
	blocks[4].push({x_coordinate:400, y_coordinate:0, block :block5});
	paint_blocks(blocks);

//	interval = setInterval(myfunction, tmp_speed);

}

function paint_blocks(blocks) {
	for (var i = 0; i < blocks.length; i++) {
		if (blocks[i][blocks[i].length - 1].block == 1) {
			// console.log("111111")
			cxt.fillStyle = "red";
			cxt.fillRect(blocks[i][blocks[i].length - 1].x_coordinate, 0, 100, 100)
		} 
	}
}



