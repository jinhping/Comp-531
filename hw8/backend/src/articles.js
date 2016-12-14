const md5 = require('md5')

const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const uploadImage = require('./uploadCloudinary')
const Profiles = require('./model.js').Profiles



const getArticles = (req, res) => {
 	if(req.params.id){
		Article.find({_id:req.params.id}).exec(function(err, articles){

            if (articles.length == 0){
                res.status(401).send("Article with this id is not found!")
                return
            }

            const articlesObj = articles[0]
            res.status(200).send({articles: articlesObj})
	   })}
	   else{
            Profiles.find({username : req.username}).exec(function(err, profiles){
                const obj = profiles[0];
                const usersToQuery = [req.username, ...obj.following];

                Article.find({author: {$in: usersToQuery}}).sort('-date').limit(10).exec(function(err, articles){
                    res.status(200).send({articles: articles})
                })

            })
        }
    
}


const postArticles = (req, res) =>{
	if(!req.body.text){
    	res.status(400).send("Miss text");
    	return;
    }
    else {
        var newarticle = new Article({
        date: new Date(), 
        text: req.text,
        author: req.username, 
        img: req.fileurl,
        comments: []
        })

        new Article(newarticle).save(function (err, usr){
            if(err) {
                return console.log(err)
            }
        })
        res.status(200).send({articles: [newarticle]}) 
    }
   
}


const putArticles = (req, res) => {
	if (!req.params.id) {
    	res.status(400).send('id is not supplied')
    	return
    }
    Article.find({_id:req.params.id}).exec(function(err, articles){


        if (articles == undefined || articles.length == 0) {
            res.status(401).send("the article id is not in the database")
            return
        }
        if (req.body.commentId == "-1") {

            var commentid = md5(req.username + new Date().getTime())
            var newComment = new Comment({
                    commentId: commentid, 
                    author: req.username, 
                    date: new Date(), 
                    text: req.body.text})
            //put into database
            new Comment(newComment).save(function (err, comments){
                if(err) { 
                    return console.log(err)
                }
            })      

            Article.findByIdAndUpdate(
                req.params.id, 
                { $addToSet: {comments: newComment}}, 
                {upsert: true, new: true},  
                function(err, articles){
                   
                })

            Article.find({_id : req.params.id}).exec(function(err,articles){
                 res.status(200).send({articles: articles});
            })
            return
        }

        if (!req.body.commentId) {
            if (articles[0].author != req.username) {
                res.status(401).send("Article is not owned")
                return
            }
            Article.findByIdAndUpdate(
                req.params.id, 
                { $set: { text: req.body.text }}, 
                { new: true }, 
                function(err, articles){
                    res.status(200).send({articles: articles})
            })

        } else {
            Comment.find({commentId: req.body.commentId}).exec(function(err, comments){
                if (comments.length == 0) {
                    res.status(401).send("comment id is not correct.")
                    return
                }
                
                if(comments[0].author != req.username) {
                    res.status(401).send("comment is not owned")
                    return
                }
                    Comment.update(
                        {commentId: req.body.commentId}, 
                        { $set: { text: req.body.text }}, 
                        { new: true }, 
                        function(err, comments){
                            if (err) {
                                return console.log(err)
                            }
                        })

                    Article.update(
                        {_id: req.params.id, 'comments.commentId': req.body.commentId}, 
                        { $set: { 'comments.$.text': req.body.text }}, 
                        { new: true },
                        function(err, articles){
                            if (err) {
                                return console.log(err)
                            }
                        })

                    Article.find({_id :req.params.id}).exec(function(err, articles){
                        res.status(200).send({articles: articles})
                    })
                
            })  
        }

    })
}




module.exports = app => {
    app.get('/articles/:id*?', getArticles)
 	app.put('/articles/:id', putArticles)
    app.post('/article', uploadImage('img'), postArticles)
}
