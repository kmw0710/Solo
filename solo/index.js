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
		let tempSavedItem = data.savedItem;
		tempSavedItem.push(saveItem);
		data.savedItem = tempSavedItem;
		data.save(err => {
			if (err) console.log(err);
			res.send(data);
		})
	});
})

app.get('/delete', (req, res) => {
	let item = req.query.Item;
	let username = req.query.username;
	User.findOne({'username': username}, (err, data) => {
		data.savedItem.splice(item, 1);
		data.save(err => {
			if (err) console.log(err);
			res.send(data)
		})
	})
})

app.get('/search', (req, res) => {
	let search = req.query.lookup;
	axios.get(`http://api.walmartlabs.com/v1/search?apiKey=${APIKEY}&query=${search}`)
		.then(datas => {
			res.send(datas.data.items)
		})
})

app.post('/create', (req, res) => {
	let username = req.body.username.toLowerCase();
	let password = req.body.password;
	User.find({'username': username}, function(err, data) {
		if (data.length === 0 && password.length >= 4) {
			User.create({
				username: username,
				password: password,
				savedItem: []
			});
			res.send('New account is created!')
		}	else if (password.length < 4) {
			res.send('Password must be at least 4 characters!')
		} else if (data.length !== 0) {
			res.send('Username already exists!')
		}
	})
})

app.post('/charge', (req, res) => {
	res.send(` I'm not charging you`)
})

app.get('/login', (req, res) => {
	let tempUsername = req.query.username.toLowerCase();
	let tempPassword = req.query.password;
	User.find({'username': tempUsername}, (err, data) => {
		if (data.length === 0) {
			res.send('Username does not exist!')
		} else if (data[0].password === tempPassword) {
			res.send(data[0])
		} else if (data[0].password !== tempPassword) {
			res.send('Wrong password!')
		}
	})
})

app.listen(port, () => {
	console.log(`server is listening on ${port}...`)
})

