var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new mongoose.Schema({
	fullUrl: String,
	hashedUrl: String
})

mongoose.model("Url", urlSchema)