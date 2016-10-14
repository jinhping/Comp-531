var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     if (req.method == 'GET' && req.url == '/') {
          var payload = { 'hello': 'world' }
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify(payload))
     } 
     else if (req.method == 'GET' && req.url == '/articles') {
          var articles = {articles: [{id:1, author:'Scott', body:'A Post'},
                                   {id:2, author:'Jinhao', body:'A Post2'},
                                   {id:3, author:'Ping', body:'A Post3'} ]}
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify(articles))
     }    
     else if (req.method == "POST" && req.url == '/login'){
          var payload = JSON.parse(req.body)
          var name = payload["username"];
          var result = {username: "<" + name + ">", result:'success'}
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify(result))
     }
     else if (req.url == '/logout') {
          var payload = 'OK' 
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(payload)
     }
}