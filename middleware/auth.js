const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    const validToken = jwt.verify(authToken, process.env.SECRET_KEY);
    req.user = validToken
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
    return;
  }
  next();
};

module.exports = auth;
