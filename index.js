// express --> instantiating a server
var express = require('express');
var fs = require('fs');

var app = express();
app.use(express.static(__dirname));
var port = process.env.PORT  || 8000;

app.use(function(req,res,next){
  res.setHeader('Content-Type', 'text/html');
  return next();
})

app.get('/', function(req,res){
  fs.readFile('index.html', function(err, data){
    console.log("get request to /")
    res.send(data);
  });
})

app.get('/peer', function(req,res){
  fs.readFile('index-peer.html', function(err, data){
    console.log("get request to /peer")
    res.send(data);
  });
})

app.get('/group', function(req,res){
  fs.readFile('index-group.html', function(err, data){
    console.log("get request to /group")
    res.send(data);
  });
})

app.listen(port, function(){
  console.log("Listening on port",port);
})
