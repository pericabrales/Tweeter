/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Peri Cabrales
 * Email: cabralep@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var twitData = require('./twitData');


var app = express();
//put back to 3000 before submitting
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(express.static('public'));


// to go to index.html page (client side)
app.get('/', function(req, res, next){
  res.status(200).render('tweeter', {
    twit: twitData,
    modal: true,
    all: true
  });
});

app.get('/twits/:number', function (req, res, next){
  var twitNum = req.params.number;

    if(twitData[twitNum]){
      res.status(200).render('tweeter', twitData[twitNum]);
    }

  else{
    next();
  }

});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
