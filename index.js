// express --> instantiating a server
var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname,'/public')));
var port = process.env.PORT  || 8000;

app.use(function(req,res,next){
  res.setHeader('Content-Type', 'text/html');
  return next();
})

// app.get('/', function(req,res){

// })

app.get('/peer', function(req,res){
  fs.readFile('public/index-peer.html', function(err, data){
    console.log("get request to /peer")
    res.send(data);
  });
})

app.get('/group', function(req,res){
  fs.readFile('public/index-group.html', function(err, data){
    console.log("get request to /group")
    res.send(data);
  });
})

app.listen(port, function(){
  console.log("Listening on port",port);
})
