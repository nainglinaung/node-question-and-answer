var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

	title: String,
	user: String,
	body: String,
	answer_count: {type:Number, default:0},
	user_id: Schema.Types.ObjectId,
	date: { type: Date, default: Date.now },
	view: {type: Number, default: 0},
	vote: {type:Number, default:0}
});


module.exports = mongoose.model('Question',schema);

