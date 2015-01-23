var express    = require('express');
var AnswerCtrl = require('../controllers/answerCtrl');

module.exports = (function() {

	'use strict';

	var router = express.Router();

	var ensureAuthenticated =  AnswerCtrl.ensureAuthenticated;

	router.post('/:id',ensureAuthenticated,AnswerCtrl.postCreate);	
	
	router.get('/up/:id',ensureAuthenticated,AnswerCtrl.getUpOrDown);

	router.get('/down/:id',ensureAuthenticated,AnswerCtrl.getUpOrDown);

	router.get('/edit/:id',ensureAuthenticated,AnswerCtrl.getEdit);

	router.post('/edit/:id',ensureAuthenticated,AnswerCtrl.postEdit);

	return router; 

})();

