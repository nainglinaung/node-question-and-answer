var Question = require('../models/question');
var Answer  = require('../models/answer');
var faker = require('faker');
var util = require('util');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});


module.exports = {


	create:function(body,callback){
		
		var q = new Question({
		  title: body.title,
		  user: faker.name.findName(),
		  body: body.body
		});

		q.save(function(err) {

			console.log(err);
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
			doc.view++;	

			
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