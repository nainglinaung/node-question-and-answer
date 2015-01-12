var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocalStrategy = require('passport-local').Strategy;


var schema = new Schema({
	user: String,
	profile: String,
	password: String,
	date: { type: Date, default: Date.now },
	point: { type:Number, default:0}
});

module.exports = mongoose.model('User',schema);

