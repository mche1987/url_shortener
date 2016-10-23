var base58 = require('../helpers/base58.js')
var config = require('./config.js')
var Url = require('../models/urls.js')

module.exports = function(app) {
	app.post("/gen_url", function(req, res){
		var longUrl = req.body.url;
		var shortUrl = '';

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
						console.log("error is: ", err)
				}
				shortUrl = config.webhost + base58.encode(newUrl._id)

				res.send({'shortUrl': shortUrl})
				})
			}
		})
	})

	app.get('/:encoded_id', function(req, res){
		var base58Id = req.params.encoded_id
		var id = base58.decode(base58Id)

		Url.findOne({_id: id}, function(err, doc){
			if(doc){
				res.redirect('http://' + doc.long_url)
			} else {
				res.redirect(config.webhost)
			}
		})

	})
}