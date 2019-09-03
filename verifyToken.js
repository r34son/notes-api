const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("auth");
  if (!token) return res.status(401).send("Not authorized");
  jwt.verify(token, process.env.TOKEN_SECRET, (err, userId) => {
    if (err) return res.status(403).send("Invalid token");
    req.userId = userId._id;
    next();
  });
}

module.exports = verifyToken;
