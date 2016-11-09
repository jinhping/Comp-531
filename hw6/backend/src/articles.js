var articles = [
	{id: 1,author:"author1", text:"text1", date: new Date(), comments : ["comment1"]},
    {id: 2,author:"author2", text:"text2", date: new Date(), comments : ["comment2"]},
    {id: 3,	author:"author3", text:"text3", date: new Date(), comments : ["comment3"]},
    {id: 4,	author:"author4", text:"text4", date: new Date(), comments : ["comment4"]},
    {id: 5,	author:"author5", text:"text5", date: new Date(), comments : ["comment5"]}
]

var numId = 5;

const getArticles = (req, res) => {
 	if(req.params.id){
		var target = articles.filter((item)=>{return item.id == req.params.id })
		if(target.length!==0){
			res.send(target);
		}
		else{
			res.send([])
		}
	}
	else{
		res.send(articles);
	}
}

const postArticles = (req, res) =>{
	if (!req.user  ) {
		req.user = 'jp64'
	}
	numId++;
    var newarticle = {id:numId, 
    	date: new Date(), 
    	text: req.body.text || 'not supplied', 
    	author: req.user, 
    	comment: [],
    	}
    articles.push(newarticle)
    res.send({'articles' : [newarticle]})
}

const putArticles = (req, res) => {
	var text = req.body.text;
	if(req.params.id > articles.length){
		res.status(401).send("User id not found!")
		return
	}

	if(!req.body.commentId){
		articles[req.params.id - 1].text = req.body.text
	}
	else{
		articles[req.params.id - 1].comments.push({commentId:req.body.commentId, text: req.body.text})
	}
	
	res.send({articles : [articles[req.params.id - 1]]});

}



module.exports = app => {
    app.get('/articles/:id*?', getArticles)
 	app.put('/articles/:id', putArticles)
    app.post('/article', postArticles)
}
