const md5 = require('md5')
const cookieParser = require('cookie-parser')

var cookieKey = 'sid'

var User = require('./model.js').User
var redis = requires('redis').createClient("redis://h:p4b9f5q8md6pii3ilif0c7dehjr@ec2-54-225-80-250.compute-1.amazonaws.com:21239")


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



function findByUsername(username, callback) {
	User.find({ username }).exec(function(err, items) {
		callback(items);
	})
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

	redis.hmset(sid, userObj)

	res.cookie(cookieKey, sid, 
		{MaxAge: 3600*1000, httpOnly: true })

	var msg = { username: username, result: 'success'}
	res.send(msg)

}



const logout = (req, res) => {
	redis.del(req.cookies[cookieKey])
	res.status(200).send('OK!')
}

const putPassword = (req,res) => {
	const msg = {username:'jp64', 
	        	  status:'will not change'
	    }
    res.send(msg)
}



function isLoggedIn(req, res, next) {
    var sid = req.cookies[cookieKey]
  	
  	if(!sid){
		res.status(401).send('Not authorized!')
		return
	}

    redis.hgetall(sid, function(err, userObj){
		console.log(sid + ' mapped to ' + userObj)
        if (userObj){
        	req.username = userObj.username
        	next()
        }
        else{
			res.status(401).send('User session not exist')
        }
    })
    
}

module.exports = app => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', isLoggedIn, logout)
     app.put('/password', isLoggedIn, putPassword)
}
