const profiles = {
	profiles : {
		'jp64' : {
			email : 'a@b.com',
			zipcode: 11111,
			avatar: 'image1.jpg',
			dob: Date.parse('1994-07-04')
		},
		'jp64test' : {
			dob: Date.parse('1999-02-02'),
			email : 'c@d.com',
			zipcode: 22222,
			avatar: 'image2.jpg'
		},
		'sep1' : {
			dob: Date.parse('1993-01-04'),
			email : 'e@f.com',
			zipcode: 33333,
			avatar: 'image3.jpg'
		}
	},
	headlines : {
		'jp64' : 'headline test 1',
		'jp64test' : 'headline test 2',
		'sep1' : 'headline test 3'
	}
	
}




const getHeadline = (req, res) => {
	if (!req.user) {
		req.user = 'jp64'
	} 
	var users
	if (req.params.users) {
		users = req.params.users.split(',')
	} else {
		users = [req.user]
	}	
	var headlines = users.map(r => {
		return {
			username: r,
			headline: profiles.headlines[r]
		}
	})
	res.send({headlines})
}

const putHeadline = (req, res) => {
	if (!req.user) req.user = 'jp64'
	profiles.headlines[req.user] = req.body.headline
	
	res.send({
		username : req.user,
		headline : req.body.headline || 'not applied'
	})
}

const getEmail = (req, res) => {
	var username = req.params.user
	if (!username) {
		username = 'jp64'
	}
	res.send({
			username : username,
			email : profiles.profiles[username].email
		}
	)
}

const putEmail = (req, res) => {
	if (!req.user) {
		req.user = 'jp64'
	}
	profiles.profiles[req.user].email = req.body.email

	res.send({
		username : req.user,
		email : req.body.email || 'not applied'
	})
}

const getZipcode = (req, res) => {
	var username = req.params.user
	if (!username) {
		username = 'jp64'
	}
	res.send({
			username : username,
			zipcode : profiles.profiles[username].zipcode
		}
	)
}

const putZipcode = (req, res) => { 
	if (!req.user) {
		req.user = 'jp64'
	}
	profiles.profiles[req.user].zipcode = req.body.zipcode

	res.send({
		username : req.user,
		zipcode : req.body.zipcode || 'not applied'
	})
}

const getAvatar = (req, res) => { 
	if (!req.user) req.user = 'jp64'
	const user = req.params.user ? req.params.user : req.user

	res.send({
		avatars:[{
			username : user,
			avatar: profiles.profiles[user].avatar	
		}]
	})
}

const putAvatar = (req, res) =>  {
	if (!req.user) {
		req.user = 'jp64'
	}
	
	profiles.profiles[req.user].avatar = req.fileurl

	res.send({
		username : req.user,
		avatar: req.fileurl || 'not applied'
	})
	
}


const getdob = (req, res) => {
	var username = req.params.user
	if (!username) {
		username = 'jp64'
	}
	res.send({
			username : username,
			dob : profiles.profiles[username].dob
		}
	)
}

const uploadImage = require('./uploadCloudinary')

module.exports = app => {

     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)

     app.get('/zipcode/:user?', getZipcode) 
     app.put('/zipcode', putZipcode)

     app.get('/avatars/:user?', getAvatar)
     app.put('/avatar', uploadImage('avatar'), putAvatar)

     app.get('/dob', getdob)

}
