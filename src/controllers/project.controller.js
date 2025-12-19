
const Model = require('../models/project.model');
const createError = require('http-errors');

// Allowed admin emails
const ALLOWED_ADMINS = ['huy@example.com', 'huyhoang.ais@gmail.com'];

// Middleware to check if user is authorized admin
const checkAdminPermission = (req) => {
  const userEmail = req.user?.email;
  if (!userEmail || !ALLOWED_ADMINS.includes(userEmail)) {
    throw createError(403, 'You do not have permission to perform this action');
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return next(createError(404, 'Project not found'));
    res.json(doc);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    // Check admin permission
    checkAdminPermission(req);
    
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
};

exports.updateById = async (req, res, next) => {
  try {
    // Check admin permission
    checkAdminPermission(req);
    
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return next(createError(404, 'Project not found'));
    res.json(doc);
  } catch (e) { next(e); }
};

exports.removeById = async (req, res, next) => {
  try {
    // Check admin permission
    checkAdminPermission(req);
    
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(createError(404, 'Project not found'));
    res.json({ deleted: true });
  } catch (e) { next(e); }
};

exports.removeAll = async (req, res, next) => {
  try {
    // Check admin permission
    checkAdminPermission(req);
    
    const r = await Model.deleteMany({});
    res.json({ deletedCount: r.deletedCount });
  } catch (e) { next(e); }
};
