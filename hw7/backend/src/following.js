const followings = {
	followings : {
	    'loggedInUser' : ['test1', 'test2'],
		'jp64': ['jp64test', 'sep1','test1'],
		'jp64test' : ['test1', 'jp64']
	}
	
} 

const putFollowing = (req, res) => {
	if (!req.user) req.user = 'loggedInUser'
	var user = req.params.user;
	if (followings.followings[req.user].indexOf(user) == -1) {
		followings.followings[req.user].push(user);
	}
	res.send({
		username : req.user,
		following : followings.followings[req.user]
	});
}

const getFollowing = (req, res) => {
	var userid = req.params.user || 'loggedInUser'
    res.send({
    	username: userid,
    	following : followings.followings[userid]
    })
}

const deleteFollowing = (req, res) => {
	if (!req.user) {
		req.user = 'loggedInUser'
	}
	var follower = req.params.user 
	followings.followings[req.user] = followings.followings[req.user].filter(
		r => r != follower)
    res.send({
    	username: req.user,
    	following : followings.followings[req.user]
    })
}


module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}