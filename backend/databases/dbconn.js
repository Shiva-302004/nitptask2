const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config();
const clc=require("cli-color")
const USER_OF_MONGO=process.env.USER_OF_MONGO
const PASSWORD_OF_MONGO=process.env.PASSWORD_OF_MONGO
const db=async()=>{
    try{
        await mongoose.connect( `mongodb+srv://${USER_OF_MONGO}:${PASSWORD_OF_MONGO}@atlascluster.gw1or1c.mongodb.net/image-management-app?retryWrites=true&w=majority`)
        console.log(clc.red.bgBlueBright("database connected"))
    }catch(err){
        console.log(clc.red.bgBlueBright(err))
    }
}
module.exports=db