var array = ["http://www.pngall.com/wp-content/uploads/2016/06/Pokemon-PNG.png", 
			"http://www.freeiconspng.com/uploads/pokemon-png-13.png", 
			"http://www.freeiconspng.com/uploads/pokemon-png-28.png",
 			"http://vignette1.wikia.nocookie.net/pokemon/images/d/d7/Ash_and_His_Friend.png/revision/latest?cb=20110118225523", 
 			"http://pokemon.supercheats.com/artwork/383.png"];

//initiate the setInterval in the beginning
var time1 = Math.floor((Math.random() * 5) + 1) * 1000;
var time2 = Math.floor((Math.random() * 5) + 1) * 1000;
var time3 = Math.floor((Math.random() * 5) + 1) * 1000;
var time4 = Math.floor((Math.random() * 5) + 1) * 1000;
var time5 = Math.floor((Math.random() * 5) + 1) * 1000;
var start1 = setInterval(changeImage, time1, "image1", "");
var start2 = setInterval(changeImage, time2, "image2", "");
var start3 = setInterval(changeImage, time3, "image3", "");
var start4 = setInterval(changeImage, time4, "image4", "");
var start5 = setInterval(changeImage, time5, "image5", "");



window.onload = function() {
	//button 1 is clicked
	document.getElementById("btn1").onclick = function () {
		if (document.getElementById("btn1").innerHTML == "Stop" ) {
			Stop(start1);
			document.getElementById("btn1").innerHTML = "Start";

		} else if (document.getElementById("btn1").innerHTML == "Start") {
			time1 = Math.floor((Math.random() * 5) + 1) * 1000;
			start1 = setInterval(changeImage, time1, "image1", "");
			document.getElementById("btn1").innerHTML = "Stop";
		}
	}

	//button 2 is clicked
	document.getElementById("btn2").onclick = function () {
		if (document.getElementById("btn2").innerHTML == "Stop" ) {
			Stop(start2);
			document.getElementById("btn2").innerHTML = "Start";

		} else if (document.getElementById("btn2").innerHTML == "Start") {
			time2 = Math.floor((Math.random() * 5) + 1) * 1000;
			start2 = setInterval(changeImage, time2, "image2", "");
			document.getElementById("btn2").innerHTML = "Stop";
		}
	}

	//button 3 is clicked
	document.getElementById("btn3").onclick = function () {
		if (document.getElementById("btn3").innerHTML == "Stop" ) {
			Stop(start3);
			document.getElementById("btn3").innerHTML = "Start";

		} else if (document.getElementById("btn3").innerHTML == "Start") {
			time3 = Math.floor((Math.random() * 5) + 1) * 1000;
			start3 = setInterval(changeImage, time3, "image3", "");
			document.getElementById("btn3").innerHTML = "Stop";
		}
	}

	//button 4 is clicked
	document.getElementById("btn4").onclick = function () {
		if (document.getElementById("btn4").innerHTML == "Stop" ) {
			Stop(start4);
			document.getElementById("btn4").innerHTML = "Start";

		} else if (document.getElementById("btn4").innerHTML == "Start") {
			time4 = Math.floor((Math.random() * 5) + 1) * 1000;
			start4 = setInterval(changeImage, time4, "image4", "");
			document.getElementById("btn4").innerHTML = "Stop";
		}
	}

	//button 5 is clicked
	document.getElementById("btn5").onclick = function () {
		if (document.getElementById("btn5").innerHTML == "Stop" ) {
			Stop(start5);
			document.getElementById("btn5").innerHTML = "Start";

		} else if (document.getElementById("btn5").innerHTML == "Start") {
			time5 = Math.floor((Math.random() * 5) + 1) * 1000;
			start5 = setInterval(changeImage, time5, "image5", "");
			document.getElementById("btn5").innerHTML = "Stop";
		}
	}


}

function Stop(x) {
	clearInterval(x);
}
 
// 改成forEach 
function changeImage(param1, param2){
	//var nums_images = {0,1,2,3,4}
	for (i = 0; i < 5; i++) {
		if (document.getElementById(param1).src == array[i]) {
			document.getElementById(param1).src = array[(i+1)%5];
			break;
		}
	}
}