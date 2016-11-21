// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: String, 
    author: String, 
    date: Date, 
    text: String
})
var articleSchema = new mongoose.Schema({
    author: String, 
    img: String, 
    date: Date, 
    text: String,
	comments: [ commentSchema ]
})


var userSchema = new mongoose.Schema({
	username: String,
    salt: String,
    hash: String    
})

var profilesSchema = new mongoose.Schema({
	username: String,
    headline: String,
    following: [ String ],
    email: String,
    zipcode: String,
    avatar: String,
    dob: Number   
})


exports.Article = mongoose.model('article', articleSchema)
exports.Comment = mongoose.model('comment', commentSchema)

exports.User = mongoose.model('users', userSchema)
exports.Profiles = mongoose.model('profiles', profilesSchema)

