const md5 = require('md5')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')

const User = require('./model.js').User
const Profiles = require('./model.js').Profiles

var cookieKey = 'sid'
const mySecretMessage = "test jp64"
const sessionUser = {}

const redis = require('redis').createClient('redis://h:pf4ke47d412oqiala5kl48iieni@ec2-54-83-63-242.compute-1.amazonaws.com:13629')



const register = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var dob =  new Date(req.body.birth).getTime();
	var zipcode = req.body.zipcode;

	if(!username || !password || !email || !dob || !zipcode){
		res.status(400).send({result:"Missing inputs"});
		return;
	}
	var salt = Math.random()*1000;
	var hash = md5(password + salt)


	User.find({ username: username }).exec(function(err, users) {
    	if (users.length != 0) {
    		res.status(401).send( "This username has already been registered.")
    		return
    	} else {
			var userobj = new User({username: username, salt: salt, hash: hash})

			new User(userobj).save(function(err, users) {
		    	if (err) {
		    		return console.log(err);
		    	}
			})

			const profileObj = new Profiles({
				username: username,
				email: email,
				dob : dob,
				zipcode : zipcode,
				headline: "default headline",
				following: [],
				avatar:"http://brazil.rice.edu/files/2012/01/Lovett_Hall1.jpg"
			})

			new Profiles(profileObj).save(function(err, users) {
		    	if (err) {
		    		return console.log(err);
		    	}
			})

			res.status(200).send({
				 	result:'success',
					username:username
			});   		
    	}
	})
}

const login = (req, res) => {
	var username = req.body.username
	var password = req.body.password

	if(!username || !password) {
		res.status(400).send("Missing input username or password")
		return
	}

	User.find({ username: username }).exec(function(err, users) {
    	if (users.length == 0) {
 			res.status(401).send("this username is not registered yet.")
 			return
     	}
     	const userObj = users[0]
     	if (userObj == null) {
     		res.status(401).send("Username is missing in the database")
     	}
     	const salt = userObj.salt
     	const hash = userObj.hash
    	const newhash = md5(password + salt)

    	if (newhash != hash) {
    		res.status(401).send("Password is wrong!")
    	} else {
    		const sessionKey = md5(mySecretMessage  + new Date().getTime() + userObj.username)
			redis.hmset(sessionKey, userObj)

			res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
			const msg = { username: username, result: 'success'}
			res.send(msg)
    	}
	})
}


const logout = (req, res) => {
	const sid = req.cookies[cookieKey]
	redis.del(sid)
	
	res.clearCookie(cookieKey)
	res.status(200).send('OK')
}

const putPassword = (req,res) => {
	const newPassword = req.body.password
	const username = req.username

	if (newPassword == null) {
		res.status(400).send("Password is missing")
		return
	}

	User.find({ username: username }).exec(function(err, users) {

		const userObj = users[0]
		const salt = userObj.salt
		const hash = userObj.hash

		const newSalt = md5(salt + new Date().getTime())
		const newHash = md5(newPassword + newSalt)

		User.update(
					{username: username}, 
					{ $set: { salt: newSalt, hash: newHash }}, 
					{ new: true }, 
					function(err, profile){
						res.status(200).send("password have been changed")
					})
	})

}



function isLoggedIn(req, res, next) {
	
    const sid = req.cookies[cookieKey]

  	if(!sid){
		return res.sendStatus(401)
	}

    redis.hgetall(sid, function(err, userObj){
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
	app.use(cookieParser());

    app.post('/register', register)
    app.post('/login', login)
   	app.use(isLoggedIn)
    app.put('/logout', logout)
    app.put('/password', putPassword)
}
