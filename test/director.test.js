const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const server = require("../app")

chai.use(chaiHttp)

let token

describe("api/directors test", () => {
	before(done => {
		chai
			.request(server)
			.post("/authenticate")
			.send({ userName: "haydar", password: "12345" })
			.end((err, res) => {
				token = res.body.token
				console.log("?????", token)
				done()
			})
	})

	describe("/GET directors", () => {
		it("it should get all directors", done => {
			chai
				.request(server)
				.get("/api/directors")
				.set("x-access-token", token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("array")
					done()
				})
		})
	})

	describe("/POST directors", () => {
		it("it should post a directors", done => {
			const director = {
				name: "kerem"
			}
			chai
				.request(server)
				.post("/api/directors")
				.send(director)
				.set("x-access-token", token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("object")
					res.body.should.have.property("name").eql("kerem")
					done()
				})
		})
	})
})
