const md5 = require('md5')
const cookieParser = require('cookie-parser')

var cookieKey = 'sid'

var User = {
	users: [{username: "", salt: "", hash: ""}]
}

const register = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400)
		return
	}

	var salt = Math.random()*1000;
	var hash = md5(password + salt)
	User.users.push({username : username, salt : salt, hash: hash});
	res.send({users: [{username: username, salt: salt, hash: hash}]})
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
		res.sendStatus(400)
		return
	}
	var userObj = User.users.filter(s => { return s.username == ''+ username})[0]
	if(!userObj || !isAuthorized(req, userObj)) {
		res.sendStatus(401)
		return
	}

	var sid = Math.floor(Math.random()*1000)

	// cookie lasts for 1 hour
	res.cookie(cookieKey, sid, 
		{MaxAge: 3600*1000, httpOnly: true })

	var msg = { username: username, result: 'success'}
	res.send(msg)

}

module.exports = app => {
	 app.use(cookieParser());
     app.post('/register', register)
     app.post('/login', login)
}

