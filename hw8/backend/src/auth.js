const md5 = require('md5')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')

const User = require('./model.js').User
const Profiles = require('./model.js').Profiles
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment

var cookieKey = 'sid'
const mySecretMessage = "test jp64"
const sessionUser = {}

const redis = require('redis').createClient('redis://h:pf4ke47d412oqiala5kl48iieni@ec2-54-83-63-242.compute-1.amazonaws.com:13629')

const FacebookStrategy = require('passport-facebook').Strategy;

const config = { clientSecret: '4555ae0c597c29ea3d35b96ee35c7660', 
					clientID: '1714799665505350', 
					callbackURL: 'https://ancient-journey-71192.herokuapp.com/auth/callback' ,
						passReqToCallback: true

				}

var frontendUrl = '' 

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
     	var salt = userObj.salt
     	var hash = userObj.hash

    	var new_hash = md5(password + salt)

    	if (new_hash != hash) {
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

	if (req.isAuthenticated()) {
		
		req.session.destroy()
		req.logout()
		
		if(req.cookies[cookieKey] !== undefined){
			var sid = req.cookies[cookieKey]
			
			redis.del(sid)
			res.clearCookie(cookieKey)
		}
		res.status(200).send('OK')

	} 
	else if (req.cookies[cookieKey] !== null) {
		const sid = req.cookies[cookieKey]
		redis.del(sid)
	
		res.clearCookie(cookieKey)
		res.status(200).send('OK')
	}

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

	if (req.isAuthenticated()) {
		
		const usr = req.user.username.split('@')

		const authObj = {}

		authObj[`Facebook`] = usr[0]  
		User.findOne({auth: authObj}).exec(function(err,user) {
			if(!user){
				req.username = req.user.username
			} else {
				req.username = user.username
			}
			next()
		})

	} else {
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
	
}


const successFunction = (req,res) => {
	res.redirect(frontendUrl)
}

const errorFunction = (err,req,res,next) => {
    if(err) {
        res.status(400)
        res.send({err: err.message})
    } else {

    }
}


const return2Frontend = (req, res, next) => {
	if(frontendUrl == ''){
		frontendUrl = req.headers.referer
	}
	next()
}


passport.use(new FacebookStrategy(config,
	function(req, token, refreshToken, profile, done){

		const username = profile.displayName.split(' ')[0] + "@" + "Facebook"

		const sid = req.cookies[cookieKey]
		if(!sid){
			User.findOne({username: username}).exec(function(err, user) {
			if(!user || user.length == 0){
				const userObj = new User({username: username, third_party_id: profile.id})
				new User(userObj).save(function (err, usr){
					if(err) {
						return console.log(err)
					}
				})
				const profileObj = new Profiles({username: username, headline: "I am login in via facebook", following:[], email: null, zipcode: null, 
					dob: new Date(1994,07,04).getTime(), avatar: "https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png"})
				new Profiles(profileObj).save(function (err, usr){
					if(err) {
					 	return console.log(err)
					}
				})
			}
			return done(null, profile)
			})
		} else {
			redis.hgetall(sid, function(err, userObj) {


				const cur_user = userObj.username
				
				Article.update({author:username}, { $set: { 'author': cur_user}}, { new: true , multi:true}, function(){})
				
				Article.update({'comments.author' : username}, { $set: {'comments.$.author': cur_user}}, { new: true , multi:true}, function(){})
				
				Comment.update({author:username}, { $set: { 'author': cur_user}}, { new: true , multi:true}, function(){})
				
				Profiles.findOne({username: username}).exec(function(err, profiles){
					if(profiles){
						Profiles.findOne({username: cur_user}).exec(function(err, newProfile) {
							if(newProfile){
								const newFollowings = newProfile.following.concat(profiles.following)
								Profiles.update({username: cur_user}, {$set: {'following': newFollowings}}, function(){})
							}
						})
						Profiles.update({username: username}, {$set: {'following':[]}}, function(){})
					}
				})
				User.findOne({username: cur_user}).exec(function(err, user){
					if(user){
						let authObj = {}
						authObj[`Facebook`] = profile.displayName.split(' ')[0]
						User.update({username: cur_user}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
					}
				})

			}
			)
			return done(null, profile)
		}		
	}
))

passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	User.findOne({third_party_id: id}).exec(function(err, user) {
		done(null, user)
	})
})

const link2fb = (req, res) => {
	const username = req.body.reguser;
	const password = req.body.regpw;

	if (!username || !password) {
		return res.status(400).send("missing username or password")
	}

	User.find({username: username}).exec(function(err, users){
        if (!users || users.length == 0){
            return res.sendStatus(400).send({result: 'User does not exist in database'})
        }

        const userObj = users[0]
		if(!userObj){
			res.status(400).send("User does not exist in database")
		}

		function isAuthorized(req, userObj) {
			var salt = userObj.salt;
			var password = req.body.regpw;
			var hash = userObj.hash;

			var new_hash = md5(password + salt)
			return hash == new_hash	
		}
		
		if(isAuthorized(req, userObj)){
			
			Article.update({author:req.username}, { $set: { 'author': username}}, { new: true, multi:true }, function(){})
			
			Article.update({'comments.author' : req.username}, { $set: {'comments.$.author': username}}, { new: true , multi:true}, function(){})
			
			Comment.update({author:req.username}, { $set: { 'author': username}}, { new: true, multi:true }, function(){})
			
			Profiles.findOne({username: req.username}).exec(function(err, profile){
				if(profile){
					Profiles.findOne({username: username}).exec(function(err, newProfile) {
						if(newProfile){
							const newFollowings = newProfile.following.concat(profile.following)
							Profiles.update({username: username}, {$set: {'following': newFollowings}}, function(){})
						}
					})
					Profiles.update({username: req.username}, {$set: { 'following':[]}}, function(){})
				}
			})
			User.findOne({username: username}).exec(function(err, user){
				if(user){
					const usr = req.username.split('@');
					const authObj = {}
					authObj[`Facebook`] = usr[0]
					User.update({username: username}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
				}
			})
			res.status(200).send({ username: username, result: 'success'})
		} else{
			res.status(401).send("password is not correct")
		}
	})
}

const unlinking = (req, res) => {
	const username = req.username

	User.findOne({username: username}).exec(function(err, user){
		if(user.auth.length !== 0){
			User.update({username: username}, {$set: {auth: []}}, {new: true}, function(){
				res.status(200).send({result: 'unlink successfully'})
			})
		} else {
			res.status(400).send("cannot unlink since there is no account linking with it")
		}
	})
}


module.exports = app => {
	app.use(cookieParser());

	app.use(return2Frontend)
	app.use(session({secret:'secret', resave: false, saveUninitialized: false}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {failureRedirect:'/fail'}), successFunction, errorFunction)
	

    app.post('/register', register)
    app.post('/login', login)
   	app.use(isLoggedIn)

   	app.use('/link/facebook', passport.authorize('facebook', {scope:'email'}))


   	app.get('/unlinking', unlinking)
	app.post('/merge', link2fb)

    app.put('/logout', logout)
    app.put('/password', putPassword)


}
