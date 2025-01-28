require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();
// rest of the packages
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const rateLimiter = require("express-rate-limit");
// const helmet = require("helmet");
// const xss = require("xss-clean");
const cors = require("cors");
// const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("../db/connect");

//  routers

const userRouter = require("../routes/userRoutes");
const homePageRouter = require("../routes/homePageRoutes");
const transactionRouter = require('../routes/transactionRoutes');

// const authRouter = require("./routes/authRoutes");



// middleware
const notFoundMiddleware = require("../middleware/not-found");
const errorHandlerMiddleware = require("../middleware/error-handler");

// app.set("trust proxy", 1);
// app.use(
  //   rateLimiter({
    //     windowMs: 15 * 60 * 1000,
    //     max: 60,
    //   })
    // );
    // app.use(helmet());
    // app.use(xss());
    // app.use(mongoSanitize());
    
    app.use(cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    }));
    app.use(express.json());
    // app.use(cookieParser(process.env.JWT_SECRET));
    
    // app.use(express.static("./public"));
    // app.use(fileUpload());
    app.use("/", (req, res) => {
      res.send("Welcome to CBDC wallet");
    });
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/homepage", homePageRouter);
    app.use('/api/v1/transactions', transactionRouter);
    // app.use("/api/v1/auth", authRouter);
    // app.use("/api/v1/homepage/places", placesRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_URL);
    if (process.env.NODE_ENV !== 'production') {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

start();
module.exports = app;