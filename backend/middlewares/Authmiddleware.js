const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const isLogin=async(req,res,next)=>{
    const token=req.headers.token
    const data=await jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=data.user
    next()
}
module.exports=isLogin