
const Model = require('../models/user.model');
const createError = require('http-errors');

exports.getAll = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return next(createError(404, 'User not found'));
    res.json(doc);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
};

exports.updateById = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return next(createError(404, 'User not found'));
    res.json(doc);
  } catch (e) { next(e); }
};

exports.removeById = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(createError(404, 'User not found'));
    res.json({ deleted: true });
  } catch (e) { next(e); }
};

exports.removeAll = async (req, res, next) => {
  try {
    const r = await Model.deleteMany({});
    res.json({ deletedCount: r.deletedCount });
  } catch (e) { next(e); }
};
