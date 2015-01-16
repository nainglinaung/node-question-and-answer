var Logger = require('winston');
var express = require('express');
var UserCtrl = require('../controllers/userCtrl');


module.exports = (function() {


	'use strict';

	var ensureAuthenticated = UserCtrl.ensureAuthenticated;
	var isLogin             = UserCtrl.isLogin;


	var router = express.Router();

	router.post('/login',UserCtrl.postLogin);

	router.get('/profile',ensureAuthenticated,UserCtrl.getProfile);

	router.post('/register',UserCtrl.postRegister);	
 	
	router.get('/register',isLogin,UserCtrl.getRegister);

	router.get('/login',isLogin,UserCtrl.getLogin);

	router.get('/logout',ensureAuthenticated,UserCtrl.getLogout);
	

	return router; 

})();

