const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Models
const User = require("../models/User")

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" })
})

router.post("/register", (req, res) => {
	const { userName, password } = req.body

	bcrypt.hash(password, 10).then(hash => {
		const user = new User({
			userName,
			password: hash
		})
		const promise = user.save()
		promise
			.then(user => {
				res.json(user)
			})
			.catch(err => {
				res.json(err)
			})
	})
})

router.post("/authenticate", (req, res) => {
	const { userName, password } = req.body

	User.findOne({ userName }, (err, user) => {
		if (err) throw err

		if (!user) {
			res.json({
				status: false,
				message: "kullanıcı bulunamadı"
			})
		} else {
			bcrypt.compare(password, user.password).then(result => {
				if (!result) {
					res.json({
						status: false,
						message: "şifre yanlış"
					})
				} else {
					const payload = {
						userName
					}
					const token = jwt.sign(payload, req.app.get("api_secret_key"), {
						expiresIn: 720 // 12 saat
					})

					res.json({
						status: true,
						token
					})
				}
			})
		}
	})
})

module.exports = router
