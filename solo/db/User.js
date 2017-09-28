var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  savedItem: Array,
  username: String,
  password: String
})

module.exports = mongoose.model('User', userSchema);
