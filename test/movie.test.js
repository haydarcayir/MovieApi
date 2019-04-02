const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const server = require("../app")

chai.use(chaiHttp)

let token, movieId

describe("api/movies test", () => {
	before(done => {
		chai
			.request(server)
			.post("/authenticate")
			.send({ userName: "haydar", password: "12345" })
			.end((err, res) => {
				token = res.body.token
				done()
			})
	})

	describe("/GET movies", () => {
		it("it should get all movies", done => {
			chai
				.request(server)
				.get("/api/movies")
				.set("x-access-token", token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("array")
					done()
				})
		})
	})

	describe("/POST a movie", () => {
		it("it should post a movie", done => {
			const movie = {
				title: "yarasın",
				director_id: "5c9e1cbfdeddd80c3c03ed57",
				category: "komedi",
				country: "turkey",
				year: 1950,
				imdb_score: 7
			}
			chai
				.request(server)
				.post("/api/movies")
				.send(movie)
				.set("x-access-token", token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("object")
					res.body.should.have.property("title")
					res.body.should.have.property("director_id")
					res.body.should.have.property("category")
					res.body.should.have.property("country")
					res.body.should.have.property("year")
					res.body.should.have.property("imdb_score")
					movieId = res.body._id
					done()
				})
		})
	})

	describe("/GET/:movie_id movie", () => {
		it("it should GET a movie by the given id ", done => {
			chai
				.request(server)
				.get("/api/movies/" + movieId)
				.set("x-access-token", token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("object")
					res.body.should.have.property("title")
					res.body.should.have.property("director_id")
					res.body.should.have.property("category")
					res.body.should.have.property("country")
					res.body.should.have.property("year")
					res.body.should.have.property("_id").eql(movieId)
					done()
				})
		})
	})

	describe("/PUT/:movie_id", () => {
		it("it should update a movie by given movie_id", done => {
			const movie = {
				title: "cekkafaları",
				director_id: "5c9e1cbfdeddd80c3c03ed57",
				category: "dram",
				country: "grece",
				year: 2000,
				imdb_score: 9
			}
			chai
				.request(server)
				.put("/api/movies/" + movieId)
				.send(movie)
				.set("x-access-token", token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("object")
					res.body.should.have.property("title").eql(movie.title)
					res.body.should.have.property("director_id").eql(movie.director_id)
					res.body.should.have.property("category").eql(movie.category)
					res.body.should.have.property("country").eql(movie.country)
					res.body.should.have.property("year").eql(movie.year)
					res.body.should.have.property("imdb_score").eql(movie.imdb_score)
					done()
				})
		})
	})

	describe("/DELETE/:movie_id", () => {
		it("it should delete a movie by given movie_id", done => {
			chai
				.request(server)
				.delete("/api/movies/" + movieId)
				.set("x-access-token", token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("object")
					res.body.should.have.property("status").eql(1)
					done()
				})
		})
	})
})
