var express  = require('express');
var mongoose = require('mongoose');


module.exports = (function() {

	'use strict';

	var router = express.Router();

	router.get('/',function(req,res){
		res.render('index', { title: 'ads'});
	});

	return router; 

})();

