var express = require("express"),
	path = require("path"),
	bodyParser = require("body-parser"),
	app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client")))

require("./server/config/mongoose.js")
require("./server/config/routes.js")(app)

app.listen(8000, function(){
	console.log("8k")
})