//clear text articles in the add new articles section
function clearTextarea() {
	document.getElementById("textarea").value = "";
}

function updateNewStatus() {
	var new_status_msg = document.getElementById("new_status").value;
	if (new_status_msg != "") {
		document.getElementById("status").innerHTML = new_status_msg;
	}
}