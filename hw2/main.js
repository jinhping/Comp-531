var array = ["http://www.pngall.com/wp-content/uploads/2016/06/Pokemon-PNG.png", 
			"http://www.freeiconspng.com/uploads/pokemon-png-13.png", 
			"http://www.freeiconspng.com/uploads/pokemon-png-28.png",
 			"http://vignette1.wikia.nocookie.net/pokemon/images/d/d7/Ash_and_His_Friend.png/revision/latest?cb=20110118225523", 
 			"http://pokemon.supercheats.com/artwork/383.png"];
var start1;
var start2;
var start3;
var start4;
var start5;
var time1;
var time2;
var time3;
var time4;
var time5;
var times = [time1, time2, time3, time4, time5] ;
var starts = [start1, start2, start3, start4, start5];
var images = ["image1","image2","image3","image4","image5"]
var btns = ["btn1","btn2","btn3","btn4","btn5"]
var mapBtn2Start = {};
var mapBtn2Time = {};
var mapBtn2Image = {};


window.onload = function() {
	init()
	map()
}

function init() {
	var j = 0;
	while (j < 5) {
		times[j] = Math.floor((Math.random() * 5) + 1) * 1000;
		starts[j] = setInterval(changeImage,times[j],images[j],"");
		j++;
	}
}

function map() {
	var i = 0;
	while (i < 5) {
		mapBtn2Time[btns[i]] = times[i]
		mapBtn2Start[btns[i]] = starts[i]
		mapBtn2Image[btns[i]] = images[i]
		i++
	}
}

function checkValid(id) {
		if (document.getElementById(id).innerHTML == "Stop" ) {
			Stop(mapBtn2Start[id]);
			document.getElementById(id).innerHTML = "Start";

		} else if (document.getElementById(id).innerHTML == "Start") {
			mapBtn2Time[id] = Math.floor((Math.random() * 5) + 1) * 1000;
			mapBtn2Start[id] = setInterval(changeImage, mapBtn2Time[id], mapBtn2Image[id], "");
			document.getElementById(id).innerHTML = "Stop";
		}
	
}

function Stop(x) {
	clearInterval(x);
}
 
function changeImage(param1, param2){
	var i = 0
	while (i < 5) {
		if (document.getElementById(param1).src == array[i]) {
			document.getElementById(param1).src = array[(i+1)%5];
			break;
		}
		i++;
	}
}