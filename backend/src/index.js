const express=require("express")
const app =express()
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config();
const clc=require("cli-color")
const authroute=require("../routes/Auth")
const photoroute=require("../routes/Photos")
const db=require("../databases/dbconn")
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",authroute)
app.use("/api/v1/photos",photoroute)
const PORT=process.env.PORT

db().then(
    app.listen(PORT,()=>{
        console.log(clc.bgBlue.white("server connected"))
    })
).catch((err)=>{
    console.log(clc.bgRed.white(err))
})