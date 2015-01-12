var Question = require('../models/question');
var Answer  = require('../models/answer');
var faker = require('faker');



module.exports = {

	create:function(body,callback){

		var q = new Question({
		  title: body.title,
		  user: faker.name.findName(),
		  body: body.body
		});


		q.save(function (err) {
			if (err) callback(null,err);	
	
			Question.findById(q, function (err, doc) {
				if (err) callback(null,err);
				callback('redirect',null);
			});
		});
	},

	upOrDown:function(req,callback){

		Question.findOne({_id:req.id},function(err,doc){
			if(err) callback(null,err);

			(req.status) ? doc.vote++ : doc.vote--;
			
			doc.save(function(err){
				if (err) callback(null,err);
				callback('redirect',null);
			});
		});
	},

	showOne:function(id,callback){
		Question.findOne({_id:id},function (err, doc) {
			
			if(err) callback(null,err);
			doc.views++;	

			
			doc.save(function(err){
				if (err) callback(null,err);
				
				Answer.find({question_id:id},function(err,answers){
					doc.answers = answers;
					callback(doc,null);
				});
			});
		});
	}
};