const jwt = require('jsonwebtoken');

// Middleware function to verify JWT
function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'tv7f7564dF%F^DDE65F75DR6CRfdc86ri');
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).json({ message: 'Invalid token' });
  }
}

module.exports = verifyToken;