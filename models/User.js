const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
	userName: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		minlength: 3
	}
})

module.exports = mongoose.model("user", UserSchema)
