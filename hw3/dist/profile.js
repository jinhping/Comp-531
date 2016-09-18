
/* 
  First check validation
  Then check which fields to be updated
*/
function update() {
	var valid = checkValid();
	if (valid){
		updateName()
		updateEmail()
		updatePhone()
		updateZipcode()
		updatePassword()
	}
}

/*
check email input patten
check phone number input pattern
check zipcode pattern
check whether password are the same or not
*/
function checkValid() {
	if(!document.getElementById("email").value.match(/\S+@\S+\.\S+/)){
		if (document.getElementById("email").value != "") {
			alert("Email Format is wrong!")
			return false;
		} 
	}
	if (!document.getElementById("phone_number").value.match("^\\d{3}-\\d{3}-\\d{4}$")) {
		if (document.getElementById("phone_number").value != "") {
			alert("Phone Format is wrong!")
			return false;
		}
	}
	if (!document.getElementById("zipcode").value.match("^\\d{5}$")) {
		if (document.getElementById("zipcode").value != "") {
			alert("Zipcode Format is wrong!")
			return false;
		}
	}
	var password = document.getElementById("password")
	var password2 = document.getElementById("password2")
	if (password.value == "" && password2.value != "") {
		alert("Password is empty !")
		return false;
	} else if (password2.value == "" && password.value != ""){
		alert("Confirmation Password is empty !")
		return false;
	}
	return true;
}

function updateName() {
	var old_name = document.getElementById("s_display_name")
	var edit_name = document.getElementById("display_name")
	if (edit_name.value != "") {
		if (edit_name.value === old_name.innerHTML) {
			edit_name.value = ""
		} else {
			old_name.innerHTML = edit_name.value;
			edit_name.value = ""
		}
	}
}

function updateEmail() {
	var old_email = document.getElementById("s_email")
	var edit_email = document.getElementById("email")
	if (edit_email.value != "") {
		if (edit_email.value === old_email.innerHTML) {
			edit_email.value = ""
		} else {
			old_email.innerHTML = edit_email.value
			edit_email.value = ""
		}
	}
}

function updatePhone() {
	var old_phone = document.getElementById("s_phone_number")
	var edit_phone = document.getElementById("phone_number")
	if (edit_phone.value != "") {
		if (edit_phone.value === old_phone.innerHTML) {
			edit_phone.value = ""
		} else {
			old_phone.innerHTML = edit_phone.value
			edit_phone.value = ""
		}
	}
}

function updateZipcode() {
	var old_zip = document.getElementById("s_zipcode")
	var edit_zip = document.getElementById("zipcode")
	if (edit_zip.value != "") {
		if (edit_zip.value === old_zip.innerHTML) {
			edit_zip.value = ""
		} else {
			old_zip.innerHTML = edit_zip.value
			edit_zip.value = ""
		}
	}
}

function updatePassword() {
	var password = document.getElementById("password")
	var password2 = document.getElementById("password2")
	if (password.value != "" || password2.value != "") {
		if (password.value == password2.value) {
			var tmp = password.value;
			password.value = password2.value;
			password2.value = tmp;
		} else {
			alert("Passwords are not the same")
		}
	}
}
