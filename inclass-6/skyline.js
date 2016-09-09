'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")



	canvas.width = window.innerWidth
	var windowColors = ["black", "yellow"]

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 


	var builds = [];

	function paint(building) {
		c.fillStyle= building['color']
		c.fillRect(building['horizontal'], building['vertical'], building['width'], building['height'])

		for (var y = floor - floorSpacing; y > floor - building['height']; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < building['width'] - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle = windowColors[Math.floor(Math.random()*windowColors.length)]
				c.fillRect(building['horizontal'] + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}



	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		var building = {}
		building['horizontal'] = x0
		building['vertical'] = floor - blgHeight
		building['width'] = blgWidth
		building['height'] = blgHeight
		building['color'] = blgColors[ Math.floor(Math.random()*blgColors.length)]
		builds.push(building)

		paint(building);

	}


	var sunImage = new Image();
	var carImage = new Image();
	sunImage.src = "http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png"
	carImage.src = "http://www.clker.com/cliparts/u/p/I/R/s/k/car-v-vectorized-hi.png"

	sunImage.onload = function (){
		c.drawImage(sunImage, 10,10,50,50);
	}

	carImage.onload = function() {
		c.drawImage(carImage, 0, floor-40, 100, 40)
	}




	var redraw = function redraw() {
		c.clearRect(0,0,canvas.width, floor)
			c.fillStyle=grad
		c.fillRect(0, floor, canvas.width, canvas.height)
		c.drawImage(sunImage, sunPosition[0], sunPosition[1], sunPosition[2], sunPosition[3])
		builds.forEach(paint)
		c.drawImage(carImage, carPosition[0], carPosition[1], carPosition[2], carPosition[3])

	}



	var sunPosition = [10, 10, 50 ,50]
	var carPosition = [0, floor-40,100, 40]











	var inc = 20;
	setInterval (function(){
		sunPosition[0] = move(sunPosition[0], canvas.width - sunPosition[2], 20)
		carPosition[0] = move(carPosition[0], canvas.width - carPosition[2], 40)
		sunPosition[1] = sunPosition[1] + inc;
		if (sunPosition[1] + sunPosition[3] > canvas.height / 4) {
			sunPosition[1] = canvas.height/4 - sunPosition[3]
		}
		else if (sunPosition[1] < 0) {
			sunPosition[1] = 0;
		}
		inc = -inc;

		redraw();

	}, 80) 


	return {
		build: build,
		builds: builds,
		redraw: redraw
	}
}

var canvas;
var app;

window.onload = function() {
	app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
    canvas = document.querySelector("canvas");
    canvas.addEventListener('click', buildingGrow, false);
}

function buildingGrow(event) {
	var horizontal = event.pageX - canvas.getBoundingClientRect().left;
	var vertical = event.pageY - canvas.getBoundingClientRect().top;
	app.builds.forEach(function(element){
		if(vertical < element['vertical'] + element['height'] && vertical > element['vertical'] 
			&& horizontal > element['horizontal'] && vertical < element['horizontal'] + element['width']) {
			element['vertical'] -= 20;
			element['height'] += 20;
			app.redraw()
		}
	})
}

function move(i, j, inc) {
	i = i + inc
	if (i >= j){
		i = 0
	} else {

	}
	return i
}