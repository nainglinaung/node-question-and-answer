var Question   = require('../models/question');
var faker      = require('faker');
var logger     = require('winston');
var prettyjson = require('prettyjson');

var q = new Question({
  title: faker.lorem.sentences(),
  user: faker.name.findName(),
  body: faker.lorem.sentences()
});


module.exports = {

	set:function(){

		q.save(function (err) {
			if (err) return logger.error(err);
			Question.findById(q, function (err, doc) {
				if (err) return logger.error(err);
				//console.log(doc); 
			});
		});

	}

};