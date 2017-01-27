var mongoose = require('mongoose');
var PublisherSchema = new mongoose.Schema(
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

var Publisher = mongoose.model('Publisher', PublisherSchema);
module.exports = Publisher;