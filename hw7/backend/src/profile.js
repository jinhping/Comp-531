const Profiles = require('./model.js').Profiles

const getHeadline = (req, res) => {
	var users;
	if (req.params.users != null) {
		users = req.params.users.split(',')
	} else {
		users = [req.username];
	}

	Profiles.find({username: {$in: users}}).exec(function(err, profiles){
		var headlines = [];
		if (profiles.length == 0) {
			res.status(400).send("No users in database was supplied")
			return
		}

		profiles.forEach(r => {
			headlines.push({
				username : r.username,
				headline: r.headline
			})
		})
		res.status(200).send({headlines: headlines})
	})
}


const putHeadline = (req, res) => {
	const username = req.username
	const headline = req.body.headline

	if (headline == null) {
		res.status(400).send('Headline is not supplied in the body')
	}

	Profiles.update(
		{username: username}, 
		{ $set: { headline: headline }}, 
		{ new: true }, 
		function(err, profile){
        	res.status(200).send({username: username, headline: headline
        });
    }) 

}



const getEmail = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	Profiles.find({username: username}).exec(function(err, profiles){
		if (profiles.length == 0) {
			res.status(400).send("User is not in the database")
            return
		}
		const profileObj = profiles[0]
		res.status(200).send({
			username: username, 
			email: profileObj.email
		})
	})

}


const putEmail = (req, res) => {

	const username = req.username
	const newEmail = req.body.email

	if (newEmail == null) {
		res.status(400).send('New email is not supplied')
	}

	Profiles.update(
		{username: username},
		{ $set: { email: newEmail}},
		{ new: true },
		function(err, profile){
        	res.status(200).send({
        		username: username, 
        		email: newEmail
        	})
    	})
}



const getZipcode = (req, res) => {

	const username = req.params.user ? req.params.user : req.username
	Profiles.find({username: username}).exec(function(err, profiles){
		if (profiles.length == 0) {
			res.status(400).send("User is not in the database")
            return
		}
		const profileObj = profiles[0]
		res.status(200).send({
			username: username, 
			email: profileObj.zipcode
		})
	})
}

const putZipcode = (req, res) => { 
	const username = req.username
	const newZipcode = req.body.zipcode

	if (newZipcode == null) {
		res.status(400).send('New zipcode is not supplied')
	}

	Profiles.update(
		{username: username},
		{ $set: { zipcode: newZipcode}},
		{ new: true },
		function(err, profile){
        	res.status(200).send({
        		username: username, 
        		zipcode: newZipcode
        	})
    	})
}

const getAvatar = (req, res) => { 
	var users;
	if (req.params.user != null) {
		users = req.params.user.split(',')
	} else {
		users = [req.username];
	}


	Profiles.find({username :{$in: users}}).exec(function(err, profiles){
		var avatars = []
		
		if (profiles.length == 0) {
			res.status(400).send("none user is supplied in the database")
            return
		}

		profiles.forEach(r => {
			avatars.push({
				username : r.username,
				avatar: r.avatar
			})
		})
		res.status(200).send({avatars:avatars})
	})
}



const putAvatar = (req, res) =>  {
	const username = req.username
	const newAvatar = req.fileurl

	if (newAvatar == null) {
		res.status(400).send('New avatar is not supplied')
	}

	Profiles.update(
		{username: username},
		{ $set: { avatar: newAvatar}},
		{ new: true },
		function(err, profiles){
        	res.status(200).send({
        		username: username, 
        		avatar: newAvatar
        	})
    	})
	
}

const getdob = (req, res) => {
	var username = req.username
	
	Profiles.find({username : username}).exec(function(err, profiles){
		const profileObj = profiles[0];
		
		res.status(200).send({
			username: username, 
			dob: profileObj.dob
		})

	})
}


module.exports = app => {

     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)

     app.get('/zipcode/:user?', getZipcode) 
     app.put('/zipcode', putZipcode)

     app.get('/avatars/:user?', getAvatar)
     app.put('/avatar', putAvatar)

     app.get('/dob', getdob)

}
