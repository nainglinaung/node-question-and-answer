var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
	user: String,
	question_id:Schema.Types.ObjectId,
	body: String,
	date: { type: Date, default: Date.now },
	vote: { type:Number, default:0}
});

module.exports = mongoose.model('Answer',schema);

