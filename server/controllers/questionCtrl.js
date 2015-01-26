var Question     = require('../models/question');
var Answer       = require('../models/answer');
var Use          = require('../models/user');
var faker        = require('faker');
var util         = require('util');
var Logger       = require('winston');
var QuestionCtrl = require('./adminCtrl');
var mongoose     = require('mongoose');

mongoose.connect('mongodb://localhost/test');


QuestionCtrl.getOne = function(req,res){
	Question.findOne({_id:req.params.id},function (err, doc) {	
		if (err) Logger.error(err);
		doc.view++;			
		doc.save(function(err){
		if(err) Logger.error(err);			
			Answer.find({question_id:req.params.id},function(err,answers){				
			    answers = (answers.length > 0) ? answers : null;    
				res.render('partials/single', { title: 'ads', title:doc.title, doc:doc,user:req.user,answers:answers});
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

QuestionCtrl.getDelete = function(req,res){
	Question.findOneAndRemove({_id:req.params.id}, function(err,data){
		if (err) Logger.error(err);
		Answer.remove({question_id:req.params.id},function(err){
			console.log(data);
			res.redirect('/');	
		});
	});
}


QuestionCtrl.getCreate = function(req,res){
	var question =  {method:"create"};
	res.render('partials/create',{title:'create', question:question});
};

QuestionCtrl.postCreate = function(req,res){
	var body = req.body; 
		
	var q = new Question({
	  title: body.title,
	   body: body.body,
	   user: req.user.name,
	   user_id : req.user._id
	});

	q.save(function(err) {
		if (err) Logger.error(err);
		Question.findById(q, function (err, doc) {
			if (err) Logger.error(err);
			res.redirect('/question/'+q._id);			
		});
	});
	
};


module.exports = QuestionCtrl;