const mongoose = require("mongoose")

module.exports = () => {
	mongoose.connect(
		"mongodb://movie_api:123qwe@ds227146.mlab.com:27146/heroku_qz22jtjq",
		{ useNewUrlParser: true }
	)
	mongoose.connection.on("open", () => {
		console.log("bağlandı")
	})
	mongoose.connection.on("error", err => {
		console.log("error", err)
	})

	mongoose.Promise = global.Promise
}
