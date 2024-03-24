const postmodel = require("../models/PostModel")
const {user}=require("../models/UserModel")
const fileUpload = async (req, res) => {
    console.log(req.user)
    console.log(req.file)
    if (!req?.file) {
        res.status(404).json({
            msg: "please upload a image",
            success: false
        })
        return;
    }
    let data = {}
    if (!!req?.file) {
        data = {
            url: req.file.location,
            type: req.file.filemimetype
        }

    }
    res.json({
        data: data,
        sucess: true
    })
}
const postUpload = async (req, res) => {
    const id = req.user.id
    const { title, photo } = req.body
    if (!title) return res.status(400).send("title is required")
    if (!photo) return res.status(400).send("photo is required")
    try {
        const dummydata = new postmodel({ title, photo, username: id })
        const data = await dummydata.save()
        return res.status(200).json({
            msg:"post uploaded successfully",
            success:true,
            data:data
        })
    } catch (err) {
        return res.status(400).json({
            msg: "something went wrong in try block of postUpload"
            , err
        })
    }
}
const postDelete = async (req, res) => {
    const id = req.user.id
    try {
        const data=await postmodel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            msg:"post deleted sucessfully",
            sucess:true,
            data:data
        })
    } catch (err) {
        return res.status(400).json({
            msg: "something went wrong in try block of postUpload"
            , err
        })
    }
}
const likeController=async(req,res)=>{
    const id=req.params.id
    if(!req.user.id) return res.status(400).json({msg:"please login to avail this facility"})
    const data=await postmodel.findById(id)
    const like=data.likes
    const newdata=await postmodel.findByIdAndUpdate(id,{likes:like+1},{new:true})
    return res.status(200).json({
        data:newdata,
        success:true
    })
}
const likedecementController=async(req,res)=>{
    const id=req.params.id
    if(!req.user.id) return res.status(400).json({msg:"please login to avail this facility"})
    const data=await postmodel.findById(id)
    const like=data.likes
    if(like===0) return res.status(400).json({msg:"no likes on this post yet"})
    const newdata=await postmodel.findByIdAndUpdate(id,{likes:like-1},{new:true})
    return res.status(200).json({
        data:newdata,
        success:true
    })
}
const commentsController=async(req,res)=>{
    const id=req.params.id
    const {title}=req.body
    if(!req.user.id) return res.status(400).json({msg:"please login to avail this facility"})
    const use=await user.findOne({_id:req.user.id})
    const data=await postmodel.findByIdAndUpdate(id,{$push:{"comments":{title,userid:use.name}}},{new:true})
    return res.status(200).json({
        success:true,
        data:data.comments
    })
}
const fetchAllpost=async(req,res)=>{
    const data=await postmodel.find({})
    return res.status(200).json({
        data:data,
        success:true
    })
}
const userposts=async(req,res)=>{
    const data=await postmodel.find({username:req.user.id})
    return res.status(200).json({
        data:data,
        sucess:true
    })
}
const commentsgetControllers=async(req,res)=>{
    const data=await postmodel.findById(req.params.id)
    return res.status(200).json({
        data:data.comments,
        success:true
    })
}
module.exports = { fileUpload, postUpload ,likeController,likedecementController,commentsController,fetchAllpost,commentsgetControllers,userposts,postDelete}