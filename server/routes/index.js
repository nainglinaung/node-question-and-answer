
module.exports = function(app) {
	
	var api      = require('./api');
	var view     = require('./view');
	var question = require('./question');
	var answer   = require('./answer');
	var user     = require('./user');

	app.use('/',view);
	app.use('/question',question);
	app.use('/api',api);
	app.use('/answer',answer);
	app.use('/user',user);

}