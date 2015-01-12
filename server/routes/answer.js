var express = require('express');

var AnswerCtrl = require('../controllers/answerCtrl');
var Logger = require('winston');

module.exports = (function() {

	'use strict';

	var router = express.Router();
	
	router.post('/:id',function(req,res){
		var request = {id:req.params.id,body:req.body.body};
		AnswerCtrl.create(request,function(id,err){
			if (err) Logger.error(err);
			res.redirect('/question/'+id);
		});
	});


	return router; 

})();

