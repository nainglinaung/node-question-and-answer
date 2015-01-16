var Question = require('../models/question');
var Answer  = require('../models/answer');
var faker = require('faker');
var util = require('util');
var Logger = require('winston');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var QuestionCtrl = require('./adminCtrl');


QuestionCtrl.getOne = function(req,res){
	Question.findOne({_id:req.params.id},function (err, doc) {
	
		if (err) Logger.error(err);
		doc.view++;			
		doc.save(function(err){
		if(err) Logger.error(err);			
			Answer.find({question_id:req.params.id},function(err,answers){
				doc.answers = answers;
				res.render('partials/single', { title: 'ads', doc:doc});
			});
		});
	});

};

QuestionCtrl.getEdit = function(req,res){
	Question.findOne({_id:req.params.id},function(err,question){
		if (err) Logger.error(err);
		question.method = "/question/edit/"+question._id;
		res.render('partials/create',{question:question});
		// need to change create or edit 
	});
}

QuestionCtrl.postEdit = function(req,res){
	Question.findOne({_id:req.params.id},function(err,question){
		
		if (err) Logger.error(err);

		var body = req.body;

		question.body = body.body;
		question.title = body.title;
		
		// of course, we need XSS protection
		question.save();

		res.redirect('/question/'+question._id);
	});
}


QuestionCtrl.getCreate = function(req,res){

	question.method = "create";

	res.render('partials/create',{title:'create', question:question});
};

QuestionCtrl.postCreate = function(req,res){
	var body = req.body; 
	var q = new Question({
	  title: body.title,
	  user: faker.name.findName(),
	  body: body.body
	});

	q.save(function(err) {

		if (err) Logger.error(err);
		Question.findById(q, function (err, doc) {
			if (err) Logger.error(err);
			res.redirect('/');			
		});
	});
};


module.exports = QuestionCtrl;

