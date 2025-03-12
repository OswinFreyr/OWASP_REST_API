// middlewares/jwtMiddleware.js
const jwt = require('jsonwebtoken');

// Secret key for signing tokens
const SECRET_KEY = process.env.JWT_KEY;

const BlacklistedToken = require('../models/BlacklistedToken');

exports.jwtMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Check if token is blacklisted
  const blacklisted = await BlacklistedToken.findOne({ where: { token } });
  if (blacklisted) {
    return res.status(403).json({ message: 'Token is invalid (logged out)' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};


// Helper function to generate token
exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};