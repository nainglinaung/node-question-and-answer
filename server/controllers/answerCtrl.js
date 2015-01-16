
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

AnswerCtrl.getUpOrDown = function(req,res){

	Answer.findOne({_id:req.params.id},function(err,doc){
		if(err) Logger.error(err);
		var question_id = doc.question_id;
		
		var path = req.url.split('/')[1];
		
		(path === 'up') ? doc.vote++: doc.vote--;

		doc.save(function(err){
			if (err) Logger.error(err);
			res.redirect('/question/'+question_id);

		});
		
	});
}

module.exports = AnswerCtrl;
