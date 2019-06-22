var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarkdownSchema = new Schema({
	title: {type: String, required: false, max: 10},
    text:  {type: String, required: false, max: 100000},
    updated: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('Markdown', MarkdownSchema);