
module.exports = {
	
	ensureAuthenticated: function(req, res, next) {
		return (req.isAuthenticated()) ? next() : res.redirect('/user/login');
	},

	isLogin: function(req,res,next) {
		return (!req.isAuthenticated()) ? next() : res.redirect('/');	
	},

};

	