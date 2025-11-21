const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
  title:       { type: String, required: true },
  completion:  { type: Date },              // can be optional if you like
  description: { type: String, required: true },
  img:         { type: String },            // NEW
  role:        { type: String },            // optional
  link:        { type: String },            // optional (repo/file link)
  download:    { type: Boolean, default: false } // optional
}, { timestamps: true });

module.exports = model('Project', projectSchema);
