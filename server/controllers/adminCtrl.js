var Answer    = require('../models/answer');
var Question  = require('../models/question');
var Logger    = require('winston');

module.exports = {
	
	ensureAuthenticated: function(req, res, next) {
		return (req.isAuthenticated()) ? next() : res.redirect('/user/login');
	},

	isLogin: function(req,res,next) {
		return (!req.isAuthenticated()) ? next() : res.redirect('/');	
	},

	getUpOrDown: function(req,res){

		var id = req.params.id;
		var path = req.url.split('/')[1];

		var model = (req.baseUrl == '/question') ? Question : Answer;

		model.findOne({_id:id},function(err,doc){
			
			if (err) Logger.error(err);
			if (req.baseUrl !== '/question') id = doc.question_id;
			
			(path === 'up') ? doc.vote++: doc.vote--;

			doc.save(function(err){
				if (err) Logger.error(err);
				res.redirect('/question/'+id);
			})

		});

	}

};

