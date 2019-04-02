const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MovieSchema = new Schema({
	director_id: Schema.Types.ObjectId,
	title: {
		type: String,
		required: [true, "`{PATH}` alanı zorunludur "],
		maxlength: [
			20,
			"`{PATH}` alanı (`{VALUE}`) , (`{MAXLENGTH}`) karakterden fazla olamaz"
		],
		minlength: [
			2,
			"`{PATH}` alanı (`{VALUE}`) , (`{MINLENGTH}`) karakterden az olamaz"
		]
	},
	category: String,
	country: String,
	year: {
		type: Number,
		max: [
			2020,
			"`{PATH}` alanı (`{VALUE}`) , (`{MAX}`) karakterden fazla olamaz"
		],
		min: [1900, "`{PATH}` alanı (`{VALUE}`) , (`{MIN}`) karakterden az olamaz"]
	},
	imdb_score: Number,
	date: {
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model("movie", MovieSchema)
