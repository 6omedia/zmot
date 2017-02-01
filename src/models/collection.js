var mongoose = require('mongoose');
var CollectionSchema = new mongoose.Schema(
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

var Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;