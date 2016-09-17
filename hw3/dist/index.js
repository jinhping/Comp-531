function clearFunction() {
	document.getElementById("myForm").reset();
}

function checkValidation() {

	var ok = true;
	//give timestamp time
	var d = new Date();
	document.getElementById("time_stamp").value = d.getTime();

	//check password match or not
	var pw1 = document.getElementById("password").value;
	var pw2 = document.getElementById("password_confirmation").value;
	if (pw1 != pw2) {
		alert("Passwords do not match with each other");
		return false;
	}

	//check birthday whether over 18
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();

	var b = document.getElementById("birthday").value;
	var birth = new Date(b);
	var _day = birth.getDate();
	var _month = birth.getMonth();
	var _year = birth.getFullYear();

	if (year - _year < 18) {
		alert("You need to be 18 years old to register!");
		return false;
	}
	if ( year - 18 == _year) {
		if (month < _month) {
			alert("You need to be 18 years old to register!");
			return false;
		} else if (_month > month) {
			return true;
		} else {
			if (day < _day + 1) {
				alert("You need to be 18 years old to register!");
				return false;
			}
		}
	}
	return true;
}

//for return user login: check whether account name or password is empty
//if not empty, return to main page
function loginFunction() {
	if (document.getElementById("account_name_login").value == "") {
		alert("Account Name is empty!");
		return false;
	} else if (document.getElementById("password_login").value == "") {
		alert("Password is empty!");
		return false;
	}
	window.location = 'main.html'; 


}
