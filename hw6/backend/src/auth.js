const md5 = require('md5')
const cookieParser = require('cookie-parser')

var cookieKey = 'sid'

var users = {
	users: [{username: "jp64",
			 email:'abc@xyz.com', 
			 zipcode: '77030', 
			 dob :  new Date().getTime()}]
}

const register = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email
	var dob = req.body.dob
	var zipcode = req.body.zipcode

	if (getUser(username)) {
        res.status(409).send(`${username} has already been registered.`)
        return
    }

    var userObj = { username, email, dob, zipcode}
    userObj.salt = Math.random()*1000
    userObj.hash = md5(userObj.salt + password)
    users.users.push(userObj)

    var msg = {username : username, result : "success"}
    res.send(msg)
}


const getUser = (username) => {
    const result = users.users.filter((user) => user.username === username)
    if (result.length == 0) {
        return
    } else {
        return result[0]
    }
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
	var userObj = getUser(username)
	if(!userObj || !isAuthorized(req, userObj)) {
		res.sendStatus(401)
		return
	}

	var sid = Math.floor(Math.random()*1000)

	res.cookie(cookieKey, sid, 
		{MaxAge: 3600*1000, httpOnly: true })

	var msg = { username: username, result: 'success'}
	res.send(msg)

}

const logout = (req, res) => {

}

const putPassword = (req,res) => {
	const msg = { message : "passwords will not change"}
    res.send(msg)
}

module.exports = app => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', isLoggedIn, logout)
     app.put('/password', putPassword)
}
