const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  user: { type: String, required: true },
  password: { type: String, required: true },
 
});

module.exports = mongoose.model('User', userSchema);