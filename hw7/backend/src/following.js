const Profiles = require('./model.js').Profiles


const putFollowing = (req, res) => {
    const userid = req.params.user
    const username = req.username
    if (userid == null) {
		res.status(400).send('no follower is supplied')
    }

    Profiles.find({username: userid}).exec(function(err, profiles){
        if (profiles.length == 0) {
            res.status(400).send('This userid is not in the database')
            return
        } else {
            Profiles.findOneAndUpdate(
                {username: username}, 
                {$addToSet: { following: userid }}, 
                {upsert: true, new: true}, 
                function(err, profile){
                })

            Profiles.find({username: username}).exec(function(err, profiles){
                res.status(200).send({
                    username: username, 
                    following: profiles[0].following})
                })
        }   
    })


}

const getFollowing = (req, res) => {
    const userid = req.params.user ? req.params.user : req.username

    Profiles.find({username : userid}).exec(function(err, profiles) {
    	if (profiles.length == 0) {
    		res.status(400).send("User doesn't exist in database")
            return
    	}
       
    	res.status(200).send({username: userid, following: profiles[0].following})
    })
}

const deleteFollowing = (req, res) => {

    const userid = req.params.user
	const username = req.username

	if (userid == null) {
		res.status(400).send('userid not supplied')
	}

	Profiles.findOneAndUpdate(
		{username: username}, 
		{ $pull: { following: userid}}, 
		{new: true }, 
		function(err, profile){
            if (err) {
                return console.log(err)
            }
        })

	
    Profiles.find({username: username}).exec(function(err, profiles){
    
		res.status(200).send({username: username, following: profiles[0].following})
	})
}


module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}