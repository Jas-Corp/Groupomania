const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const request_token = req.headers.authorization.split(" ")[1];
    const token = jwt.verify(request_token, process.env.SECRET);
    const email = token.email;
    const isAdmin = token.isAdmin;
    if (!token || !email) throw "Token invalid";

    req.email = email;
    req.isAdmin = isAdmin;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue",
    });
  }
};
