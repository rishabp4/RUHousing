const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  netID: { type: String, default: null },
  photoURL: { type: String, default: null },
});

module.exports = mongoose.model('User', UserSchema);
