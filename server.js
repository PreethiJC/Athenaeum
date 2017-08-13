var express = require('express');
var app = express();
var goodreads = require('goodreads');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//express-session
var session = require('express-session');
app.use(session({
    secret: 'topsecret'
}));

//passport-js
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app")(app);
// require ("./assignment/app")(app);
require("./project/app")(app);

var port = process.env.PORT || 3000;

app.listen(port);