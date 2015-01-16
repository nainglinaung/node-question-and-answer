var express = require('express');


var QuestionCtrl = require('../controllers/questionCtrl');



module.exports = (function() {

	'use strict';

	var router = express.Router();

	var ensureAuthenticated = QuestionCtrl.ensureAuthenticated;
		

	router.get('/create',ensureAuthenticated,QuestionCtrl.getCreate);

	router.post('/create',ensureAuthenticated,QuestionCtrl.postCreate);
	
	router.get('/up/:id',ensureAuthenticated,QuestionCtrl.getUpOrDown);

	router.get('/down/:id',ensureAuthenticated,QuestionCtrl.getUpOrDown);

	router.get('/edit/:id',ensureAuthenticated,QuestionCtrl.getEdit);

	router.post('/edit/:id',ensureAuthenticated,QuestionCtrl.postEdit);

	router.get('/:id',QuestionCtrl.getOne);


	return router; 

})();

