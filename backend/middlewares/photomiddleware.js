const multer=require("multer")
const multers3=require("multer-s3")
const aws=require("@aws-sdk/client-s3")
const dotenv=require("dotenv")
const path =require("path")
dotenv.config()

//s3 credentials
const s3=new aws.S3Client({
    credentials:{
        secretAccessKey:process.env.S3_SECRET_KEY,
        accessKeyId:process.env.S3_ACCESS_KEY
    },
    region:process.env.REGION
})
const storage=multers3({
    s3:s3,
    bucket:process.env.BUCKET_NAME,
    contentType: multers3.AUTO_CONTENT_TYPE,
    metadata:function(req,file,cb){
        cb(null,{fieldName:file.fieldname});
    },
    key:function (req,file,cb){
        cb(null,Date.now().toString())
    }
})
function checkfiletype(file,cb){
    const filetypes=/jpeg|jpg|png|gif|mp4|mov|png/
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=filetypes.test(file.mimetype)

    if(extname &&mimetype){
        return cb(null,true)
    }else{
        cb('error it can recieve only jpeg|jpg|png|gif|mp4|mov|png')
    }
}
const upload=multer({
    storage:storage,
    fileFilter:function (req,file,cb) {
        checkfiletype(file,cb)
    }
})
module.exports=upload