const tmp_headline ='I want to be a web developer'
const tmp_email ='jp64@rice.edu'
const tmp_zipcode = '77030'
const tmp_avatar = 'photo.jpg'


const index = (req, res) => {
	console.log(req.params.user)
    res.send({ hello: 'world' })
}


const getHeadline = (req, res) => {
	var username = req.params.user
	res.send({
		headlines:[{
			username : username,
			headline : tmp_headline
		}]
	})
}

const putHeadline = (req, res) => {
	res.send({ headlines : [{
		username : 'jp64',
		headline : req.body.headline || 'not applied'
	}]})
}

const getEmail = (req, res) => {
	var username = req.params.user
	res.send({
		emails:[{
			username : username,
			email : tmp_email
		}]
	})
}

const putEmail = (req, res) => {
	res.send({emails : [{
			username : 'jp64',
			email : req.body.email || 'not applied'
		}]})
}

const getZipcode = (req, res) => {
	var username = req.params.user
	res.send({
		zipcodes:[{
			username : username,
			zipcode : tmp_zipcode
		}]
	})
}

const putZipcode = (req, res) => { 
	res.send({
		zipcodes : [{
			username : 'jp64',
			zipcode : req.body.zipcode|| 'not applied'
		}]})
}

const getAvatar = (req, res) => { 
	var username = req.params.user
	res.send({
		avatars:[{
			username : username,
			avatar : tmp_avatar
		}]
	})
}

const putAvatar = (req, res) =>  {
	res.send({avatars : [{
		username : 'jp64',
		avatar : req.body.avatar || 'not applied'
	}]})
}

module.exports = app => {
     app.get('/', index)

     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)

     app.get('/zipcode/:user?', getZipcode) 
     app.put('/zipcode', putZipcode)

     app.get('/avatars/:user?', getAvatar)
     app.put('/avatar', putAvatar)
}
