var Logger = require('winston');
var express = require('express');
var userCtrl = require('../controllers/userCtrl');
var passport = require('passport');


var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];


module.exports = (function() {


	'use strict';


	function ensureAuthenticated(req, res, next) {
		return (req.isAuthenticated()) ? next() : res.redirect('/user/login');
	}

	function isLogin(req,res,next) {
		return (!req.isAuthenticated()) ? next() : res.redirect('/');	
	}

	var router = express.Router();

	router.post('/login',passport.authenticate('local-login',{
		successRedirect:'/',
		failureRedirect:'/user/login',
		failureFlash:true

	}));

	router.get('/profile',ensureAuthenticated,function(req,res){
		res.json({user:req.user});
	});

	router.post('/register',passport.authenticate('local-signup',{
		successRedirect:'/',
		failureRedirect:'/user/register',
		failureFlash:true
	}))	
 	
	router.get('/register',isLogin,function(req,res){
		res.render('partials/register',{title:'register',message:req.flash('signupMessage')});
	});

	router.get('/login',function(req,res){
		res.render('partials/login',{title:'login',message: req.flash('loginMessage')});
	});

	router.post('/login',isLogin,function(req,res){
		res.json({post:'login'});
	});

	router.get('/', function(req, res){
  		res.json({post:'success'});
	});


	return router; 

})();

