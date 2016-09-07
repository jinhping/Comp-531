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

function checkValid() {
	
	if(!document.getElementById("email").value.match(/\S+@\S+\.\S+/)){
		if (document.getElementById("email").value == "") {
		
		} else {
			alert("Email Format is wrong!")
			return false;
		}	
	}
	
	if (!document.getElementById("phone_number").value.match("^\\d{3}-\\d{3}-\\d{4}$")) {
		if (document.getElementById("phone_number").value == "") {
		
		} else {
			alert("Phone Format is wrong!")
			return false;
		}	
	}
	if (!document.getElementById("zipcode").value.match("^\\d{5}$")) {
		if (document.getElementById("zipcode").value == "") {
			
		}else {
			alert("Zipcode Format is wrong!")
			return false;
		}	
	}
	var password = document.getElementById("password")
	var password2 = document.getElementById("password2")

		if (password.value == "" && password2.value != "") {
			alert("Password is empty !")
			console.log("11111")
			console.log(password2.value)
			return false;
		} else if (password2.value == "" && password.value != ""){
			alert("Confirmation Password is empty !")
			console.log("22222")
			console.log(password.value)
			return false;
		}
	return true;
}

function updateName() {
	var old_name = document.getElementById("s_display_name")
	var edit_name = document.getElementById("display_name")
	if (edit_name.value == "") {
		//console.log("22222")
		return;
	} else {
		if (edit_name.value === old_name.innerHTML) {
			alert("Display Name is the same as old one. No change is made !");
			edit_name.value = ""
		} else {
			alert("Display Name is going to be changed !" )
			old_name.innerHTML = edit_name.value;
			edit_name.value = ""
		}
	}
}

function updateEmail() {
	var old_email = document.getElementById("s_email")
	var edit_email = document.getElementById("email")
	if (edit_email.value == "") {
		console.log("333333")
		return;
	} else {

		if (edit_email.value === old_email.innerHTML) {
			alert("New Email entered is the same as old one. No changes is made !")
			edit_email.value = ""
		} else {
			alert("Email is going to be changed !")
			old_email.innerHTML = edit_email.value
			edit_email.value = ""
		}
	}
}

function updatePhone() {
	var old_phone = document.getElementById("s_phone_number")
	var edit_phone = document.getElementById("phone_number")
	if (edit_phone.value == "") {
		return;
	} else {
		if (edit_phone.value === old_phone.innerHTML) {
			alert("Phone number is unchanged!")
			edit_phone.value = ""
		} else {
			alert("Phone number is going to be changed !")
			old_phone.innerHTML = edit_phone.value
			edit_phone.value = ""
		}
	}
}

function updateZipcode() {
	var old_zip = document.getElementById("s_zipcode")
	var edit_zip = document.getElementById("zipcode")
	if (edit_zip.value == "") {
		return;
	} else {
		if (edit_zip.value === old_zip.innerHTML) {
			alert("Zipcode is unchanged !")
			edit_zip.value = ""
		} else {
			alert("Zipcode is going to be changed !")
			old_zip.innerHTML = edit_zip.value
			edit_zip.value = ""
		}
	}
}

function updatePassword() {
	var password = document.getElementById("password")
	var password2 = document.getElementById("password2")
	if (password.value == "" && password2.value == "") {

	} else {
		if (password.value == password2.value) {
			alert("Password updated successfully!")
			password.value = ""
			password2.value = ""
		} else {
			alert("Passwords are not the same")
		}
	}
}
