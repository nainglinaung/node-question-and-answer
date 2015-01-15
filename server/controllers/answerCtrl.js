
var Answer  = require('../models/answer');
var faker = require('faker');


module.exports = {

	create:function(req,callback){

		var ans = new Answer({
		  user: faker.name.findName(),
		  body: req.body,
		  question_id: req.id,
		});

		ans.save(function (err) {
			
			if (err) callback(null,err);
			
			Answer.findById(ans, function (err, doc) {
				if (err) callback(null,err);
				callback(req.id,null);
			});
		});
	},

	upOrDown:function(req,callback){

		Answer.findOne({_id:req.id},function(err,doc){
			if(err) callback(null,err);
			var question_id = doc.question_id;

			(req.status) ? doc.vote++ : doc.vote--;
			doc.save(function(err){
				if (err) callback(null,err);
				callback(question_id,null);
			});
			
		});
	},
}	