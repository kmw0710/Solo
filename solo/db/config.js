const mongoose = require('mongoose');


const db = mongoose.connection;

db.on('error', () => console.error('MongoDB Fails!'));
db.once('open', function() {
  console.log('MongoDB is OPEN!')
})

mongoose.connect('localhost:27017/Item')


// const db = mongoose.connect('mongodb://127.0.0.1:1228/Item', function(error){
//   if(error) console.log(error);
// 	console.log("MongoDB connection successful");
// });

module.exports = db;
