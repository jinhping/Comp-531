
var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session =require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

const config = { clientSecret: '4555ae0c597c29ea3d35b96ee35c7660', 
					clientID: '1714799665505350', 
					callbackURL: 'http://localhost:3000/auth/callback' }

app = express()
app.use(session({secret:'thisIsMySecretMessage'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())


// serilarize the user for the session
passport.serializeUser(function(user, done) {
	users[user.id] = user
	done(null, user.id)
})

//deserialize the user from the session
passport.deserializeUser(function(id, done) {
	var user = users[id]
	done(null)
})

passport.use(new FacebookStrategy(config,
 function(token, refreshToken, profile, done) {
 	process.nextTick(function() {
 		//register the user in our system
 		return done(null, profile)
 	})
 }))

function logout(req, res) {
	req.logout();
	res.redirect('/')
}

function isLoggedIn(req, res, next) {
	if (req.isAuthentichated()) {
		next()
	} else {
		res.redirect('/login')
	}
}

function profile(req, res) {
	res.send('ok now what?', req.user)
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

	res.status(200).send({
		 	result:'success',
			username:username
	});
}



const login = (req, res) => {
	var username = req.body.username
	var password = req.body.password
	if(!username || !password) {
		res.status(400).send("Missing input")
		return
	}
	
	var msg = { username: username, result: 'success'}
	res.send(msg)

}



const logoutAction = (req, res) => {
	res.send('OK')
}

const putPassword = (req,res) => {
	const msg = {username:'jp64', 
	        	  status:'will not change'
	    }
    res.send(msg)
}




module.exports = app => {
    app.post('/login', login)
    app.put('/logout', logoutAction)
    app.post('/register', register)
    app.put('/password',putPassword)


	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile',profile)
}
