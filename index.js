var express = require('express');

var app = express();


app.set('view engine','jade');
app.set('views', __dirname + '/server/views');


require('./server/config')(app,express);

app.use('/static', express.static(__dirname+'/public/components'));
app.use('/public', express.static(__dirname+'/public/custom'));




// seed 
/*
var seeds = require('./server/seeds/seeds');
seeds.set();
*/
// route 




var routes = require('./server/routes')(app);


var port = process.env.PORT || 8080;
app.listen(port);
console.log('magic happened at'+port);