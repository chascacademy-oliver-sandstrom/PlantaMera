const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Check if the header exists
  if (!req.header('Authorization')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Get token from header and split it
  const headerParts = req.header('Authorization').split(' ');

  // Check if the header has two parts
  if (headerParts.length !== 2) {
    return res.status(401).json({ msg: 'Malformed authorization header' });
  }

  // Get the token from the header parts
  const token = headerParts[1];

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
