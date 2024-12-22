const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return next(new ErrorHandler("please login to access the resource", 401));
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id;
    next();
  } catch (error) {
    return next(new ErrorHandler("please login to access the resource", 401));
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    console.log(req.id);
    const user = await User.findById(req.id);
    if (user.role !== "admin") {
      return next(new ErrorHandler("You are not an admin", 401));
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "server error", status: false });
  }
};
