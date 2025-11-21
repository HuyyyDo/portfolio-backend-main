
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  created:   { type: Date, default: Date.now },
  updated:   { type: Date, default: Date.now }
});

userSchema.pre('save', function(next){
  this.updated = Date.now();
  next();
});

module.exports = model('User', userSchema);
