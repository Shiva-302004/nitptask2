const express=require("express")
const authroute=express.Router();
const {logincontroller,signupcontroller}=require("../controllers/AuthControllers")

authroute.post("/login",logincontroller)
authroute.post("/signup",signupcontroller)

module.exports=authroute