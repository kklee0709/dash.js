var express = require('express');
var serveStatic = require('serve-static')
var cool = require('cool-ascii-faces');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// 1. configure app

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. use middleware

app.use('/dist', express.static(path.join(__dirname, '/dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Simple logging middleware:
app.use(function(req,res,next){
  console.log(req.method+' '+req.baseUrl+' '+req.url+' '+(new Date()));

  // middleware that don’t generate responses must call next() or requests will never end!
  next();
});

app.use('/kk_public', express.static(__dirname + '/kk_public', {'index': ['player.html', 'index.html']}));
app.use('/samples/dash-if-reference-player', express.static(__dirname + '/samples/dash-if-reference-player', {'index': ['player.html', 'index.html', 'eme.html']}));
app.use('/samples/ad-insertion', express.static(__dirname + '/samples/ad-insertion', {'index': ['player.html', 'index.html']}));
app.use('/samples/basic-page-embed', express.static(__dirname + '/samples/basic-page-embed', {'index': ['auto-load-single-video-with-context-and-source', 'auto-load-multi-video.html', 'index.html']}));
app.use('/samples/getting-started', express.static(__dirname + '/samples/getting-started', {'index': ['baseline.html', 'debug.html', 'caption_vtt.html']}));
//app.use('/samples/chromecast', express.static(__dirname + '/samples/chromecast', {'index': ['auto-load-multi-video.html', 'index.html']}));
//app.use('/kk_sample', express.static(__dirname + '/kk_sample', {'index': ['mse.html', 'index.html']}));

// 3. define routes

// 4. start the server

app.listen(app.get('port'), function(req, res) {
  console.log("Node app is running on port:" + app.get('port'))

  app.set('title', 'dash.js Player');
  console.log(app.get('title'));
})

//-------------------------------------

// Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
// this middleware will be executed for every request to the app

/*
app.use(function (req, res, next) {
  console.log('---------------- Time: %d', Date.now());
  next();
})
*/

//app.use(express.static('public'));
//app.use('/public', express.static('public'));
//app.use('/public', express.static(__dirname + '/public'));
//app.use(serveStatic('public', {'index': ['default.html', 'default.htm']}))
//app.use('/public', express.static(__dirname + '/public', {'index': ['player5.html', 'default.htm']}));

// Test
app.use('/faces', function(request, response, next) {
  console.log("/faces");

// middleware that don’t generate responses must call next() or requests will never end!
  next();
});
app.get('/faces', function(request, response, next) {
  response.send("Hello World! "+cool());
});
