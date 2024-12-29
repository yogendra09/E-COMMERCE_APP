const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: ".env" });

const userRoutes = require("./routes/user.routes.js");
const productRoutes = require("./routes/product.routes.js");
// const userRoutes = require('./routes/userRoutes.js')


const logger = require("morgan");
app.use(logger("tiny"));

const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-store-sooty-phi.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    allowedHeaders: [
      "X-Requested-With",
      "Content-Type",
      "Authorization",
      "Cookie",
    ],
    credentials: true, // Allows cookies and other credentials
  })
);

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

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

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
