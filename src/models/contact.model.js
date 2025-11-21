
const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true }
}, { timestamps: true });

module.exports = model('Contact', contactSchema);
