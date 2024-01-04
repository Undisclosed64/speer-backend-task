const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  // Get auth header
  const authHeader = req.headers.authorization;

  // Check for auth header
  if (!authHeader) {
    return res.status(403).json({
      message: "You are not authorized to access this route. Please log in.",
    });
  }

  const tokenParts = authHeader.split(" ");

  // Extract token
  const token = tokenParts[1];

  // Verify token
  jwt.verify(token, process.env.key, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({
        message: "Token is invalid! Please login again.",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = verify;
