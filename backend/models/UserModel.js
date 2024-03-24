const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required field"]
    },
    email:{
        type:String,
        required:[true,"email field is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"pasword field is required"]
    }
},{ timestamps: true } )

const user=new mongoose.model("User",userSchema)
module.exports={user}