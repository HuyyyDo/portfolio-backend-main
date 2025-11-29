
// const { Schema, model } = require('mongoose');

// const userSchema = new Schema({
//   firstname: { type: String, required: true },
//   lastname:  { type: String, required: true },
//   email:     { type: String, required: true, unique: true },
//   password:  { type: String, required: true },
//   created:   { type: Date, default: Date.now },
//   updated:   { type: Date, default: Date.now }
// });

// userSchema.pre('save', function(next){
//   this.updated = Date.now();
//   next();
// });

// module.exports = model('User', userSchema);

// src/models/user.model.js
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true },
  created:   { type: Date, default: Date.now },
  updated:   { type: Date, default: Date.now }
});

// pre-save hook: update timestamp and hash password if modified
userSchema.pre('save', async function (next) {
  try {
    this.updated = Date.now();

    // only hash if password was created/modified
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// instance method to compare a candidate password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('User', userSchema);

