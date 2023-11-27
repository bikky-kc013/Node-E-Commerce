const express = require("express");
const app = express();
app.use(express.json());
const createError = require("http-errors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
app.use(morgan("dev"));
const { connection } = require("./config/database");
connection();
const { authRoute } = require("./routes/authRoute");
const { verifyAccessToken } = require("./controllers/jwtValidation");
const { productRoute } = require("./routes/productRoute");
const { errorHandler, pageNotFound } = require("./helpers/error-handler");
const { orderRouter } = require("./routes/orderRoute");

app.get("/home", verifyAccessToken, (req, res) => {
  res.send("This is a home page");
});

app.use(verifyAccessToken,orderRouter);
//Note: If you want to make your login more secure then please use the verifyAccessToken in front of the authroute. 
app.use(authRoute);
app.use(verifyAccessToken, productRoute);

app.use(pageNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Listening to the port ${PORT}`);
});


