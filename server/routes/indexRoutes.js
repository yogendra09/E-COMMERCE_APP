const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const { home, userRegister, userLogin, currentUser, } = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
//home
router.get("/", home);

//current user
router.get("/user",isAuthenticated ,currentUser);

//user register
router.post("/register", userRegister);

// user login
router.post("/login", userLogin);





module.exports = router;
