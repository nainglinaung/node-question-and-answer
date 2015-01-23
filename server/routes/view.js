var express  = require('express');
var mongoose = require('mongoose');
var Logger   = require('winston');
var Question = require('../models/question');

module.exports = (function() {

	'use strict';

	var router = express.Router();

	router.get('/',function(req,res){
		Question.find({},{body:false},function (err, doc) {
  			if (err) return Logger.error(err);
  			res.render('partials/question',{title:'Hey', user:req.user, questions:doc});
  			
		});
	
	});

	return router; 

})();

