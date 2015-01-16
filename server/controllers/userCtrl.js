var user  = require('../models/user');
var faker = require('faker');
var UserCtrl = require('./adminCtrl');


var passport = require('passport');


UserCtrl.getRegister = function(req,res){
	res.render('partials/register',{title:'register',message:req.flash('signupMessage')});
}

UserCtrl.getLogin = function(req,res){
	res.render('partials/login',{title:'login',message: req.flash('loginMessage')});
}

UserCtrl.postRegister = passport.authenticate('local-signup',{
	successRedirect:'/',
	failureRedirect:'/user/register',
	failureFlash:true
});

UserCtrl.postLogin = passport.authenticate('local-login',{
	successRedirect:'/',
	failureRedirect:'/user/login',
	failureFlash:true
});

UserCtrl.getProfile = function(req,res){
	res.json({user:req.user});
};



module.exports = UserCtrl;	