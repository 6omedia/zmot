var mongoose = require('mongoose');
var IndustrySchema = new mongoose.Schema(
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

var Industry = mongoose.model('Industry', IndustrySchema);
module.exports = Industry;