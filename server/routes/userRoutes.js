import express from "express";
import { home, userRegister } from "../controllers/userController.js";

const router = express.Router();


router.post("/",home);



export default router