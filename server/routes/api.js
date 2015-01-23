var express  = require('express');
var mongoose = require('mongoose');
var Question = require('../models/question');





module.exports = (function() {

	'use strict';

	var router = express.Router();

	router.get('/',function(req,res){
		Question.find({},{body:false},function (err, doc) {
  			if (err) return console.error(err);
  			res.json(doc);
  		});
	});
	return router; 
})();

