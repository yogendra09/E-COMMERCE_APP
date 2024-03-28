
import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

const home = asyncHandler(async(req,res,next)=>{
    console.log("home")
  }) 
  

const userRegister = asyncHandler(async(req,res,next)=>{
  console.log("register")
}) 

export {userRegister ,home}