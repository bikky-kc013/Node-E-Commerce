const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { checkAdmin } = require("../middlewares/admin-check");
const { userRoutes } = require("../middlewares/universalPath");

const signInAccessToken = async (userId, isAdmin) => {
  try {
    const payload = {
      userId,
      isAdmin,
    };
    const secret = process.env.SECRET_KEY1;

    const options = {
      expiresIn: "24h",
    };

    const token = jwt.sign(payload, secret, options);

    return token;
  } catch (error) {
    throw createError(500, error.message);
  }
};




const verifyAccessToken = (req, res, next) => {

 const isAllowed  = userRoutes.some(route=>{
  return route.path === req.path && route.methods.includes(req.method);
 })

 console.log(isAllowed)
  if(isAllowed) {
    return next();
   }
    
  if (!req.headers["authorization"]) {
    throw createError.Unauthorized("Sorry, unauthorized. No Authorization header found.");
  }

  const bearerToken = req.headers["authorization"].slice(7);

  jwt.verify(bearerToken, process.env.SECRET_KEY1, (err, payload) => {
    if (err) {
      return next(createError.Unauthorized("Sorry, we cannot verify you."));
    } else {
      req.payload = payload;
      checkAdmin(req, res, next);
    }
  });
};



const signInRefreshToken = async (userId) => {
  try {
    const payload = {
      userId,
    };

    const secret = process.env.SECRET_KEY1;

    const options = {
      expiresIn: "1h",
    };

    const token = jwt.sign(payload, secret, options);

    return token;
  } catch (error) {
    throw createError(500, error.message);
  }
};

module.exports = { signInAccessToken, verifyAccessToken, signInRefreshToken };
