var btn_id = document.getElementById("btn");
var msg = document.getElementById("message")

window.onload = function() {	
	btn_id.addEventListener('mouseover', changePos, false);
	btn_id.addEventListener("click", pressClick, false);
}

function changePos() {
	//console.log("111111");
	if (!event.shiftKey) {
		btn_id.style.position = "absolute"
		btn_id.style.right = Math.floor(Math.random() * window.innerWidth * 0.7) + "px";
		btn_id.style.bottom = Math.floor(Math.random() * window.innerHeight * 0.7) + "px";
	}
}

function pressClick() {
	if (btn_id.innerHTML == "Click Me") {
		btn_id.innerHTML = "Play Again";
		msg.style.display = 'block';
		btn_id.removeEventListener('mouseover',changePos);
	}
	else if (btn_id.innerHTML == "Play Again") {
		btn_id.innerHTML = "Click Me";
		msg.style.display = "none";
		btn_id.addEventListener('mouseover', changePos, false);
		changePos();
	}
}
