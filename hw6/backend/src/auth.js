const md5 = require('md5')
const cookieParser = require('cookie-parser')

var cookieKey = 'sid'

var User = {
	users: [{username: "", salt: "", hash: ""}]
}

const register = (req, res) => {

	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var dob = req.body.dob;
	var zipcode = req.body.zipcode;

	if(!username || !password || !email || !dob || !zipcode){
		res.status(400).send({result:"Missing inputs"});
		return;
	}
	var salt = Math.random()*1000;
	var hash = md5(password + salt)
	User.users.push({username : username, salt : salt, hash: hash});
	res.status(200).send({
		 	result:'success',
			username:username
	});
}



function isAuthorized(req, userObj) {
	var salt = userObj.salt
	var password = req.body.password
	var hash = md5(password + salt)
	return userObj.hash == hash
}



const login = (req, res) => {
	var username = req.body.username
	var password = req.body.password
	if(!username || !password) {
		res.status(400).send("Missing input")
		return
	}
	var userObj = User.users.filter(s => { return s.username == ''+ username})[0]
	if(!userObj || !isAuthorized(req, userObj)) {
		res.status(401).send("does not have this user")
		return
	}

	var sid = Math.floor(Math.random()*1000)

	res.cookie(cookieKey, sid, 
		{MaxAge: 3600*1000, httpOnly: true })

	var msg = { username: username, result: 'success'}
	res.send(msg)

}



const logout = (req, res) => {
	res.send('OK')
}

const putPassword = (req,res) => {
	const msg = {username:'jp64', 
	        	  status:'will not change'
	    }
    res.send(msg)
}

module.exports = app => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', logout)
     app.put('/password', putPassword)
}
