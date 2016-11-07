var articles = [
	{id: 1, text:"text1", author:"author1"},
    {id: 2, text:"text2", author:"author2"},
    {id: 3,	text:"text3", author:"author3"},
    {id: 4,	test:"text4", author:"author4"},
    {id: 5,	test:"text5", author:"author5"}
]

var numId = 5;

// const getArticles = (req, res) => {
// 	res.send(JSON.stringify(articles))

// }

const getArticlesById = (req, res) => {
 if(req.params.id){
		var target = articles.filter((item)=>{return item.id == req.params.id })
		if(target.length!==0){
			res.send({articles:target});
		}
		else{
			res.send({articles:[]})
		}
	}
	else{
		res.send({articles:articles});
	}
}

const addArticle = (req, res) =>{
	numId++;
    var newarticle = {id:numId, text: req.body.text, author: req.body.author}
    articles.push(newarticle)
    res.send({'articles' : [newarticle]})
}


module.exports = (app) => {
	app.get('/articles', getArticlesById)
	app.get('/articles/:id?', getArticlesById)
	app.post('/article', addArticle)
}