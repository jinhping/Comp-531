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
var img;

window.onload = function() {
    img = document.getElementById("jerry");
    cxt.drawImage(img, 200, 600, 100, 100);
}
  

var blocks = [[],[],[],[],[]];

var s = 0;
var gameOver = false;

var d = new Date();
var n = d.getTime();
var d2;
var n2;
var total_time;
var final_score =  0;
var average;
var number_cats = 0;

var vary_speed = 0 ;
var button_click_count = 0;


var gap = 500;

function changeLevelE() {
	button_click_count++;
	if (button_click_count != 1) {
		window.location.reload()
	}
	vary_speed = 2
	start();
	setTimeout(myfunction, tmp_speed);
}

function changeLevelM() {
	button_click_count++;
	if (button_click_count != 1) {
		window.location.reload()
	}
	vary_speed = 5
	start();
	setTimeout(myfunction, tmp_speed);
}

function changeLevelH() {
	button_click_count++;
	if (button_click_count != 1) {
		window.location.reload()
	}
	vary_speed = 10
	start();
	setTimeout(myfunction, tmp_speed);
}


function myfunction() {
	d2 = new Date();
	n2 = d2.getTime();
	total_time = (n2 - n )/ 1000
	document.getElementById("time").innerHTML = Math.round(total_time) + " seconds " ;
	average = Math.round(final_score / Math.round(total_time))
	document.getElementById("average").innerHTML = average + " points / second" ;
	document.getElementById("cats").innerHTML = number_cats + "  sets of " ;


	moveblock();
	scorePoints();
	if (gameOver == true) {
		return;
	}
	s += vary_speed;
	gap = 500;
	if (total_time > 15 && total_time <= 30) {
		gap = 400
	} else if (total_time > 30) {
		gap = 300;
	}	

	if (s % gap == 0) {
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
				img = document.getElementById("tom");
				cxt.drawImage(img, blocks[i][j].x_coordinate,blocks[i][j].y_coordinate + vary_speed, 100, 100)
			}
			blocks[i][j].y_coordinate += vary_speed;
		}
	}
}

function scorePoints() {
		if (blocks[0][0].y_coordinate >= 700) {
			if (tmp_speed == gameSpeed) {
				points += tmp_speed;
				final_score = points;
				number_cats++;
			} else if (tmp_speed < gameSpeed) {
				points += gameSpeed * 2;
				final_score = points;
				number_cats++;

			} else if (tmp_speed > gameSpeed) {
				points += gameSpeed / 2;
				final_score = points;
				number_cats++;

			}
			score.innerHTML = "Score: " + points;
			for (var i = 0; i < blocks.length; i++) {
				var j = blocks[i].shift();
				if (j.block != 0) {
					cxt.clearRect(j.x_coordinate, j.y_coordinate, 100, 100)
				}
			}
		}

		if (blocks[startingPostion.x / 100].length != 0 && blocks[startingPostion.x / 100][0].block == 1) {
			if (blocks[startingPostion.x / 100][0].y_coordinate + 100 >= startingPostion.y) {
				alert("You are catched by Tom!")
				gameOver = true;
				return
			}
		}
}

function start() {
	d = new Date();
	n = d.getTime();
	tmp_speed = gameSpeed
	document.onkeyup = function() {
		tmp_speed = gameSpeed
	}

	document.onkeydown = function(e) {
		//move to the right
		if (e.keyCode == 39) {
			if (startingPostion.x < 400) {
				cxt.clearRect(startingPostion.x, startingPostion.y, 100, 100);
				img = document.getElementById("jerry");
				cxt.drawImage(img, startingPostion.x + 100, startingPostion.y, 100, 100);
				startingPostion.x = startingPostion.x + 100;
			} 
		} else if (e.keyCode == 37) {  // move to the left
			if (startingPostion.x >  0) {
				cxt.clearRect(startingPostion.x, startingPostion.y, 100, 100);
				img = document.getElementById("jerry");
				cxt.drawImage(img,startingPostion.x - 100, startingPostion.y, 100, 100);
				startingPostion.x = startingPostion.x -  100;
			}
		} else if (e.keyCode == 38) { // move up which half the speed			
			tmp_speed = gameSpeed * 2;
		} else if (e.keyCode == 40) { 
			tmp_speed = gameSpeed / 2;
		}
	}
	var block1 = Math.random() < 0.5 ? 0 : 1;
	var block2 = Math.random() < 0.5 ? 0 : 1;
	var block3 = Math.random() < 0.5 ? 0 : 1;
	var block4 = Math.random() < 0.5 ? 0 : 1;
	var block5 = Math.random() < 0.5 ? 0 : 1;
	blocks[0].push({x_coordinate: 0, y_coordinate: 0, block : block1});
	blocks[1].push({x_coordinate:100, y_coordinate:0, block:block2});
	blocks[2].push({x_coordinate:200,y_coordinate:0, block :block3});
	blocks[3].push({x_coordinate:300,y_coordinate:0, block :block4});
	blocks[4].push({x_coordinate:400, y_coordinate:0, block :(block1 + block2 + block3 + block4) == 4 ? 0 : block5});
	paint_blocks(blocks);
}

function paint_blocks(blocks) {
	for (var i = 0; i < blocks.length; i++) {
		if (blocks[i][blocks[i].length - 1].block == 1) {
		 	img = document.getElementById("tom");
			cxt.drawImage(img, blocks[i][blocks[i].length - 1].x_coordinate, 0,100,100);
		} 
	}
}



