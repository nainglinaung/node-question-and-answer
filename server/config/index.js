


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride=  require('method-override');
var session = require('express-session');
var flash = require('connect-flash');

var passport = require('passport');
require('./passport')(passport);



var database = require('./database');




module.exports = function(app) {

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());


app.use(methodOverride());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


}