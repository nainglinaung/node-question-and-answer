var express = require('express');
var passport = require('passport');
var app = express();
var flash = require('connect-flash');
var methodOverride=  require('method-override');
var session = require('express-session')


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


app.set('view engine','jade');
app.set('views', __dirname + '/server/views');
	




var mongoose = require('mongoose');




mongoose.connect('mongodb://localhost/test');

var seeds = require('./server/seeds/seeds');


seeds.set();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());


app.use(methodOverride());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/static', express.static(__dirname+'/public/components'));
app.use('/public', express.static(__dirname+'/public/custom'));


// route 

var api = require('./server/routes/api');
var view = require('./server/routes/view');
var question = require('./server/routes/question');
var answer = require('./server/routes/answer');
var user = require('./server/routes/user');



app.use('/',view);
app.use('/question',question);
app.use('/api',api);
app.use('/answer',answer);
app.use('/user',user);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());









// passport


var port = process.env.PORT || 8080;


app.listen(port);
console.log('magic happened at'+port);