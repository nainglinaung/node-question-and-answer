var User          = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;


module.exports =function(passport) {

	passport.serializeUser(function(user,done){
		done(null,user.id);
	});

	
	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			done(err,user);
		})
	});

	passport.use('local-login',new LocalStrategy({
		usernameField:'email',
		passwordField:'password',
		passReqToCallback:true
	}, function(req,email,password,done){
		User.findOne({'local.email':email},function(err,user){
			if (err) return done(err);
			if (!user) return done(null,false,req.flash('loginMessage','No user found'));
			if (!user.isValidPass(password)) return done(null,false,req.flash('loginMessage','Oops Wrong Password'));
			return done(null,user);
		});
	}


	));

	passport.use('local-signup',new LocalStrategy({
		usernameField:'email',
		passwordField:'password',
		passReqToCallback:true
	}, function(req,email,password,done){

		process.nextTick(function(){			
			
			User.findOne({'local.email':email},function(err,user){
				if (err) return done(err);
				if (user) {
					return done(null,false,req.flash('signUpMessage','That email is already taken'));
				} else {
					var newUser = new User();
					newUser.local.email = email;
					newUser.name = req.body.name;
					newUser.local.password = newUser.generateHash(password);
					newUser.save(function(err){
						if (err) throw err;
						return done(null,newUser);
					})
				}
			});
		});	

	}));
}