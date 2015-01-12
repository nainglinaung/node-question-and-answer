var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

	title: String,
	user: String,
	body: String,
	answer_count: {type:Number, default:0},
	date: { type: Date, default: Date.now },
	views: {type: Number, default: 0},
	vote: {type:Number, default:0}
});


module.exports = mongoose.model('Question',schema);

