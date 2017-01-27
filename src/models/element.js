var mongoose = require('mongoose');
var ElementSchema = new mongoose.Schema(
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

var Element = mongoose.model('Element', ElementSchema);
module.exports = Element;