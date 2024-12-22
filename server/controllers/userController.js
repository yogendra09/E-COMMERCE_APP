const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
// const sendMail = require("../utils/nodemailer");
const { sendtoken } = require("../utils/sendToken");

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ status:true, data:users});
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id);
  if(!user) return next(new ErrorHandler("user not exist", 401));
  const senduser = {name:user.name,email:user.email,phone:user.phone};
  res.status(200).json({ status:true,data:senduser});
});

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone , password } = req.body;
  if (!name || !email || !phone ||!password) {
    return next(new ErrorHandler("please fill all fields", 400));
  }
  
  const newUser = new User(req.body);

  await newUser.save();
  sendtoken(newUser, 200, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("user not exist", 401));
  const isMatch = user.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("invalid credential"), 403);
  sendtoken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  const option = {
    exipres: new Date(),
    httpOnly: true,
    secure:true
  };
  res
    .status(200)
    .cookie("token",'', option)
    .json({ message: "user logout!",status:true });
});

exports.confirmEmail = catchAsyncErrors(async(req,res,next)=>{
  const {email} = req.body;
  if(!email) return next(new ErrorHandler("please enter email",400));
  const user = await User.findOne({email});
  if(!user) return next(new ErrorHandler("user not found",404));
  user.isEmailVerified = true;
  await user.save();
  res.status(200).json({message:"email verified",status:true});

})

exports.sendForgetPasswordOtp = catchAsyncErrors(async(req,res,next)=>{
  const {email} = req.query;
  if(!email) return next(new ErrorHandler("please enter email",400));
  const user = await User.findOne({email});
  if(!user) return next(new ErrorHandler("user not found",404));
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 300000;
  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();
  
  const url = `${req.protocol}://${req.headers.host}/user/forget-link/${user._id}`
  res.json(url);
   
  // sendMail(req,res,next,{
  //   email:user.email,
  //   subject:"forget password",
  //   message:`your otp is ${otp} and it will be expired in 5 minutes`,
  //   html:`<h1>your otp is ${otp}</h1>`
  // });

})

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
  const {email,otp,password} = req.body;
  if(!email || !otp || !password) return next(new ErrorHandler("please fill all fields",400));
  const user = await User.findOne({email});
  if(!user) return next(new ErrorHandler("user not found",404));
  if(user.otp !== otp || user.otpExpiry < Date.now()) return next(new ErrorHandler("invalid otp",400));
  user.password = password;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();
  sendtoken(user,200,res);


})
