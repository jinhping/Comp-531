const express = require('express')
const bodyParser = require('body-parser')

const articles ={
	article : [
		{id : 1, author : "A", text : "this is A"},
		{id : 2,author : "B", text : "this is B"},
		{id : 3,author : "C", text : "this is C"}
	]
}


const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     let id = articles.article[articles.article.length-1]["id"] + 1;
     articles.article = [...articles.article,{"id":id, "author": "D", "text":req.body["body"]}]
     res.send(req.body)
}


const getArticle = (req, res) => {
	res.send(JSON.stringify(articles))
}


const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles', getArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
