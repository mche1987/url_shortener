var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the counters schema with an _id field and a seq field
var CounterSchema = Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 }
});

// create a model from that schema
var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
	_id:  { type: Number, index: true },
	long_url: String,
	created_at: Date
})

// middleware that always runs prior to saving new object?
urlSchema.pre('save', function(next){
	var doc = this;
	counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
		if(error){
			return next(error);
		}
		doc._id = counter.seq;
		doc.created_at = new Date();
		next();
	})
})

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;