var express = require("express")
var router = express.Router()

//Models
const Movie = require("../models/Movie")

router.get("/", (req, res, next) => {
	const promise = Movie.aggregate([
		{
			$lookup: {
				from: "directors",
				localField: "director_id",
				foreignField: "_id",
				as: "director"
			}
		},
		{
			$unwind: {
				path: "$director"
			}
		}
	])

	promise
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.send(err)
		})
})

router.get("/top10", (req, res, next) => {
	const promise = Movie.find({})
		.limit(10)
		.sort({ imdb_score: -1 })

	promise
		.then(movies => {
			if (!movies) {
				next({ message: "top 10 bulunamadı", score: 4 })
			}

			res.json(movies)
		})
		.catch(err => {
			res.json(err)
		})
})

router.get("/:movie_id", (req, res, next) => {
	const promise = Movie.findById(req.params.movie_id)

	promise
		.then(movie => {
			if (!movie) {
				next({ message: "the movie was not found", code: 1 })
			}

			res.json(movie)
		})
		.catch(err => {
			res.json(err)
		})
})

router.get("/:between/:start_year/:end_year", (req, res, next) => {
	const promise = Movie.find({
		year: { $gte: req.params.start_year, $lte: req.params.end_year }
	})

	promise
		.then(movies => {
			if (!movies) {
				next({ message: "aralıkta film bulunamadı", code: 5 })
			}

			res.json(movies)
		})
		.catch(err => {
			res.json(err)
		})
})

router.put("/:movie_id", (req, res, next) => {
	const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
		new: true
	})

	promise
		.then(movie => {
			if (!movie) {
				next({ message: "update için bulunamadı", code: 2 })
			}
			res.json(movie)
		})
		.catch(err => {
			res.json(err)
		})
})

router.delete("/:movie_id", (req, res, next) => {
	const promise = Movie.findByIdAndDelete(req.params.movie_id)

	promise
		.then(movie => {
			if (!movie) {
				next({ message: "silmek için bulunamadı", code: 3 })
			}

			res.json({
				status: 1
			})
		})
		.catch(err => {
			res.json(err)
		})
})

router.post("/", function(req, res, next) {
	/*
	const { title, category, country, year, imdb_score } = req.body
	const movie = new Movie({
		title: title,
		category: category,
		country: country,
		year: year,
		imdb_score: imdb_score
  })*/

	const movie = new Movie(req.body)

	/*
	movie.save((err, data) => {
		if (err) res.json(err)

		res.json({ status: 1 })
  }) */

	const promise = movie.save()
	promise
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.send(err)
		})
})

module.exports = router
