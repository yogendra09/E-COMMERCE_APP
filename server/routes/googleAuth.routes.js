// backend/routes/googleAuthRoutes.js
const express = require("express");
const passport = require("passport");
const { sendtoken } = require("../utils/sendToken");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    if(req.user){
      const token = req.user.getJwtToken();
    const options = {
      exipres: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // jab https par chalyege tab kar denge secure true
      // secure: true,
    };
  
    res
      .status(302)
      .cookie("token", token, options)
      .redirect(`http://localhost:5173/googleAuth/${token}`);
    }
    else{
      res.status(400).json({status:false,message:"google auth failed"})
    }
  }
  
);

module.exports = router;
