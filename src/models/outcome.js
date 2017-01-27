var mongoose = require('mongoose');
var OutcomeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		description: String,
		img_link: String
	}
);

var Outcome = mongoose.model('Outcome', OutcomeSchema);
module.exports = Outcome;