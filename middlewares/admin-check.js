const jwt = require("jsonwebtoken");
const createError = require("http-errors");


const checkAdmin = (req, res, next) => {
  const bearerToken = req.headers["authorization"].slice(7);
  jwt.verify(bearerToken, process.env.SECRET_KEY1, (err, payload) => {
    if (err) {
      return next(createError.Unauthorized("Sorry, we cannot verify you."));
    } else {
      if (payload.isAdmin) {
        return next(); 
      } else {
        return next(createError.Forbidden("Access denied. Only admin users are allowed."));
      }
    }
  });
};

module.exports = { checkAdmin };