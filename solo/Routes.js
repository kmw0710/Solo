const express = require('express');
const router = express.Router();
const User = require('./db/User.js');
const axios = require('axios');
const APIKEY = require('./APIKEY.js');


router.get('/check', (req, res) => {
	User.find({}, (err, data) => {
		if (!data) {
			Item.create({
				item: "hi",
				user: "checking"	
			})
		}
	})
})

router.get('/search', (req,res) => {
	let search = req.query.lookup;
	axios.get(`http://api.walmartlabs.com/v1/search?apiKey=${APIKEY}&query=${search}`)
		.then(datas => {
			res.send(datas.data.items)
			console.log(datas.data.items)
		})
})

router.get('/create', (req, res) => {
	console.log(req.session)
	res.redirect('/login')
})

router.get('/login', (req, res) => {
	
})

module.exports = router;
