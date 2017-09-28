const express = require('express')
const app = express();
const User = require('./db/User');
const db = require('./db/config');
const BodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');
const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const APIKEY = require('./APIKEY.js');
const port = 1111;

app.use(express.static('./public'));
app.use(require('express-session')({
	secret: 'Minwoo shop'
}))
app.use(BodyParser())
app.use(passport.initialize());
app.use(passport.session());

app.post('/save', (req, res) => {
	let saveItem = req.body.savedItems;
	let username = req.body.username;
	User.findOne({'username': username}, (err, data) => {
		console.log(data, 'thistime')
	})
})

app.get('/search', (req, res) => {
	let search = req.query.lookup;
	console.log(req.session, 'req.session')
	axios.get(`http://api.walmartlabs.com/v1/search?apiKey=${APIKEY}&query=${search}`)
		.then(datas => {
			res.send(datas.data.items)
		})
})

app.post('/create', (req, res) => {
	let username = req.body.username.toLowerCase();
	let password = req.body.password;
	User.find({'username': username}, function(err, data) {
		console.log(data)
		if (data.length === 0) {
			User.create({
				username: username,
				password: password,
				savedItem: []
			});
			res.send('New account is created!')
		} else if (data.length !== 0) {
			res.send('Username already exists!')
		}
	})
})

app.get('/login', (req, res) => {
	let tempUsername = req.query.username.toLowerCase();
	let tempPassword = req.query.password;
	User.find({'username': tempUsername}, (err, data) => {
		if (data[0].password === tempPassword) {
			console.log(data[0], 'data0')
			res.send(data[0])
		} else if (data[0].password !== tempPassword) {
			res.send('Wrong password!')
		}
	})
})


app.listen(port, () => {
	console.log(`server is listening on ${port}...`)
})

