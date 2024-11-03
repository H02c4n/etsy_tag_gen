// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Not authorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: "Token verification failed" });
    req.user = decoded;
    next();
  });
};

module.exports = protect;
