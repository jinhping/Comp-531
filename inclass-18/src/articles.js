var articles = [
	{id: 1, text:"text1", author:"author1"},
    {id: 2, text:"text2", author:"author2"},
    {id: 3,	text:"text3", author:"author3"},
    {id: 4,	test:"text4", author:"author4"},
    {id: 5,	test:"text5", author:"author5"}
]

var numId = 5;

const getArticles = (req, res) => {
	res.send(JSON.stringify(articles))
}

const getArticlesById = (req, res) => {
	if (req.params.id){
		if (articles.length < req.params.id ) {
			var tmp_articles = []

			res.send(JSON.stringify(tmp_articles))
		} else {
			 res.send(JSON.stringify(articles.filter((article) => {
					return article.id == req.params.id})))
		}
    }
    else{
        res.send(JSON.stringify(articles))
    }
}

const addArticle = (req, res) =>{
	numId++;
    var newarticle = {id:numId, text: req.body.text, author: req.body.author}
    articles[newarticle.id] = newarticle
    res.send(newarticle)
}


module.exports = (app) => {
	app.get('/articles', getArticles)
	app.get('/articles/:id?', getArticlesById)
	app.post('/article', addArticle)
}