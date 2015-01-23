var mongoose      = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt-nodejs');

var Schema = mongoose.Schema;


var schema = new Schema({
	name: String,
	local: {
		email:String,
		password:String
	},
	facebook:{
		id:String,
		token:String,
		email:String,
		name:String
	},
	twitter:{
		id:String,
		token:String,
		displayName:String,
		username:String
	},
	google:{
		id:String,
		token:String,
		email:String,
		name:String
	},
	profile: String,
	date: { type: Date, default: Date.now },
	point: { type:Number, default:0},
	question_count: { type:Number, default:0},
	answer_count: {type:Number,default:0}
});

schema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

schema.methods.isValidPass = function(password) {
	return bcrypt.compareSync(password,this.local.password);
}


module.exports = mongoose.model('User',schema);

