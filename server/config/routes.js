// var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);

module.exports = function(app) {
	app.post("/gen_url", function(req, res){
		console.log(req.body)
		// regex to clean string and validate url
		// hash algorithm to generate key
		// return hash
	})
}