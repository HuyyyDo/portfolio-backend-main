const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  try {
    console.log('AUTH header:', req.headers.authorization);
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      console.error('No token provided');
      return res.status(401).json({ status: 401, message: 'No token provided' });
    }

    // verify token - make sure JWT_SECRET is set in your .env
    const secret = process.env.JWT_SECRET || 'replace_this_default_secret';
    const payload = jwt.verify(token, secret);
    console.log('decoded token payload:', payload);

    // attach user info to request (optional)
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    console.error('JWT verify error:', err && err.message ? err.message : err);
    return res.status(401).json({ status: 401, message: 'Invalid token' });
  }
};
