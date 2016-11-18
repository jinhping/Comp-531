// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, date: Date, text: String
})
var articleSchema = new mongoose.Schema({
	id: Number, author: String, img: String, date: Date, text: String,
	comments: [ commentSchema ]
})


var userSchema = new mongoose.Schema({
	username: String,
    salt: String,
    hash: String    
})

var profilesSchema = new mongoose.Schema({
	username: String,
    status: String,
    following: [ String ],
    email: String,
    zipcode: String,
    picture: String    
})

var postsSchema = new mongoose.Schema({
	id: Number,
    author: String,
    body: String,
    date: Date,
    img: String, 
    comments: [{
        commentId: Number,
        author: String,
        body: String,
        date: Date
    }]
})



exports.Article = mongoose.model('article', articleSchema)

exports.Comment = mongoose.model('comment', commentSchema)
exports.User = mongoose.model('users', userSchema)
exports.Profiles = mongoose.model('profiles', profilesSchema)
exports.Posts = mongoose.model('posts', postsSchema)

