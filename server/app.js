const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: ".env" });

const connectDB = require("./config/db.config");
connectDB();

const logger = require('morgan');
// app.use(logger("tiny"));

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET || "its_a_secret",
  })
);
app.use(cookieparser());

const { generatedErrors } = require("./middlewares/error.js");
const ErrorHandler = require("./utils/ErrorHandler.js");

// if (process.env.NODE_ENV == "production") {

app.get("*", (req, res, next) => {
  console.log(path.join(`${__dirname}/../frontend/dist/index.html`));

  res.sendFile(path.join(`${__dirname}/../frontend/dist`, "index.html"));
});
// } else {
// app.get("/", (req, res, next) => res.send("server is ready"));
app.all("*", function (req, res, next) {
  next(new ErrorHandler(`Requested URL not found ${req.url}`, 404));
});
// }

app.use(generatedErrors);

module.exports = app;
