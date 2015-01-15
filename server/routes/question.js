var express = require('express');
var Logger = require('winston');

var QuestionCtrl = require('../controllers/questionCtrl');



module.exports = (function() {

	'use strict';

	var router = express.Router();


	router.get('/create',function(req,res){
		res.render('partials/create',{title:'create'});
	});

	router.post('/create',function(req,res){
		QuestionCtrl.create(req.body,function(data,err){
			if (err) Logger.error(err);
			if (data === 'redirect') res.redirect('/');
		});
	});

	router.get('/up/:id',function(req,res){

		var request = {status:true,id:req.params.id};

		QuestionCtrl.upOrDown(request,function(doc,err){
			if (err) Logger.error(err);
			res.redirect('/question/'+request.id);
					
		});
		
	});


	router.get('/down/:id',function(req,res){

	
		var request = {status:false,id:req.params.id};

		QuestionCtrl.upOrDown(request,function(doc,err){
			if (err) Logger.error(err);
			res.redirect('/question/'+request.id);
		
			
		});
	});



	router.get('/:id',function(req,res){
		QuestionCtrl.showOne(req.params.id,function(doc,err){
			if(err) Logger.error(err);
			res.render('partials/single', { title: 'ads', doc:doc});
		});
	});


	return router; 

})();

