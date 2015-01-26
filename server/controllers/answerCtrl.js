var Answer     = require('../models/answer');
var faker      = require('faker');
var Logger     = require('winston');
var AnswerCtrl = require('./adminCtrl');


AnswerCtrl.postCreate = function(req,res){

	console.log(req.user);	
	
	var ans = new Answer({
	  user: req.user.name,
	  body: req.body.body,
	  user_id: req.user._id, 
	  question_id: req.params.id
	});

	ans.save(function (err) {
		
		if (err) Logger.error(err);
		
		Answer.findById(ans, function (err, doc) {
			if (err) Logger.error(err);
			res.redirect('/question/'+doc.question_id);
		});
	});
};

AnswerCtrl.getEdit = function(req,res){
	Answer.findOne({_id:req.params.id},function(err,answer){
		if (err) Logger.error(err);
		console.log(err);
		console.log(answer);
		res.render('partials/editAnswer',{title:'ads',answer:answer});	
	});
};

AnswerCtrl.postEdit = function(req,res){
	Answer.findOne({_id:req.params.id},function(err,answer){
		if (err) Logger.error(err);
		answer.body = req.body.body;
		// of course, we need XSS protection
		answer.save();
		res.redirect('/question/'+answer.question_id);
	});
}

AnswerCtrl.getDelete = function(req,res){
	Answer.findOneAndRemove({_id:req.params.id}, function(err,answer){
		if (err) Logger.error(err);
		res.redirect('/question/'+answer.question_id)

	});
}

module.exports = AnswerCtrl;