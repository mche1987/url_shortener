// var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);

var base58 = require('../helpers/base58.js')
var config = require('./config.js')
var Url = require('../models/urls.js')

module.exports = function(app) {
	app.post("/gen_url", function(req, res){
		console.log(req.body.url) // long url
		var longUrl = req.body.url;
		var shortUrl = '';

		// checking to see if already exists - this is inefficient
		Url.findOne({long_url: longUrl}, function(err, doc){
			if(doc){
				shortUrl = config.webhost + base58.encode(doc._id);
				res.send({'shortUrl': shortUrl})
			} else {
				var newUrl = Url({
					long_url: longUrl
				});

				newUrl.save(function(err){
					if(err) {
						console.log(err)
						res.send({'error': err})
					}
					shortUrl = config.webhost + base58.encode(newUrl._id)

					res.send({'shortUrl': shortUrl})
				})
			}
		})
	})

	app.get('/:encoded_id', function(req, res){
		var base58Id = require.params.encoded_id
		var id = base58.decode(base58Id)

		// check if url already exists in db
		Url.findOne({_id: id}, function(err, doc){
			if(doc){
				res.redirect(doc.long_url)
			} else {
				res.redirect(config.webhost)
			}
		})

	})
}