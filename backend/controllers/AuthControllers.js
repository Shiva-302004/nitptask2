const {user}=require("../models/UserModel")
const {hashpass}=require("../helper/AuthHelper")
const validator=require("validator")
const dotenv=require("dotenv")
const bcryptjs=require("bcryptjs")
dotenv.config()
const jwt=require("jsonwebtoken")
const logincontroller=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email) res.send("email field is required")
        if(!password) res.send("password field is required")

        const data=await user.findOne({email})
        if(!data){
            return res.status(400).json({
                msg:"user not exist",
                success:false
            })
        }else{
            const pass=await bcryptjs.compare(password,data.password)
            if(!pass){
                return res.status(400).json({
                    msg:"invalid username or password",
                    sucess:false
                })
            }else{
                const payload={
                    user:{
                        id:data._id
                    }
                }
                const token=await jwt.sign(payload,process.env.JWT_SECRET_KEY)
                return res.status(200).json({
                    msg:"login successfull",
                    sucess:true,
                    token:token,
                    data:data
                })
            }
        }
    }catch(err){
        res.status(404).json({
            msg:"something went wrong",
            err
        })
    }
}
const signupcontroller=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name) return res.send("name field is required")
        if(!password) return res.send("password is required")
        if(!email) return  res.send("email is required")
        if(!validator.isEmail(email)){
           return  res.status(400).json({
                msg:"enter a valid email ",
                success:false
            })
        }else{
            const use=await user.findOne({email})
            if(use){
                return res.status(400).json({
                    msg:"email already exist",
                    success:false
                })
            }else{
                const pass=await hashpass(password)
                const newdata=new user({name,email,password:pass})
                const  data=await newdata.save()
                const payload={
                    user:{
                        id:data._id
                    }
                }
                const token=await jwt.sign(payload,process.env.JWT_SECRET_KEY)
                return res.status(200).json({
                    msg:"signup successfull",
                    data:data,
                    success:true,
                    token:token
                })
            }
        }
    }catch(err){
        return res.status(404).json({
            msg:"something went wrong",
            err
        })
    }
}
module.exports={logincontroller,signupcontroller}