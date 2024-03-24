const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is compulsary"]
    },
    photo:{
        type:String,
        required:[true,"photo is compulsary"]
    },
    username:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[
        {
            title:{
                type:String,
            },
            userid:{
                type:String,
            }
        }
    ]
})

const post=new mongoose.model("Post",postSchema)

module.exports=post