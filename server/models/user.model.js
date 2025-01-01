const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true , default:1 },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    unique: true,
  },
  phone:{
    type:String,
    required:[true,'Please enter your phone number'],
    unique: true,
    match:[
      /^(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
      'Please enter a valid phone number in the format +xx (xxx) xxx-xxxx'
    ]
  },
  cart:[cartSchema],
  role:{
   type:String,
   default:"user",
   enum:["user","admin"]
  },
  otp:{
    type:String,
    default:null
  },
  otpExpiry:{
    type:Date,
    default:null
  },
  permissions:{
    type:Array,
    default:[],
  },
  password: {
    select:false,
    type: String,
    required: [true, 'Please enter your password'],
  },
});


userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id,email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;