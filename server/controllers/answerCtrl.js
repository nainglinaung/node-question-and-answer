var Answer  = require('../models/answer');
var faker = require('faker');
var Logger = require('winston');
var AnswerCtrl = require('./adminCtrl');


AnswerCtrl.postCreate = function(req,res){

	var ans = new Answer({
	  user: faker.name.findName(),
	  body: req.body.body,
	  question_id: req.params.id,
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


module.exports = AnswerCtrl;
