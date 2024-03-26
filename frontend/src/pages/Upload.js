import React from 'react'
import upload from "../components/upload_area.png"
import { Link } from 'react-router-dom';
const Upload = () => {
    const [image,setimage]=useState()
    const [title,settitle]=useState({
        title:"",
        photo:""
    })
    const UploadPost=async(e)=>{
        e.preventDefault()
    console.log(title)
    let responseData;
    let product=title

    let formdata=new FormData()
    formdata.append('file',image)

     fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/upload`,{
      method:"POST",
      headers:{
        Accept:'application/json',
        "token":localStorage.getItem("token")
      },
      body:formdata
    })
    .then((res)=>res.json()).then((data)=>{
        if(data.sucess){
            product.photo=data.data.url
            console.log(product)
            fetch('https://backendimageapp.onrender.com/api/v1/photos/uploadpost',{
              method:"POST",
              headers:{
                "Content-Type":"Application/json",
                "token":localStorage.getItem("token")
              },
              body:JSON.stringify(product),
            }).then((res)=>res.json()).then((data)=>{
              if(data.success){
                toast.success(data.msg)
                setpost([...post,data.data])
              }else{
                toast.error(data.msg)
              }
            }).catch((err)=>console.log(err))
          }
          console.log(product)
          console.log(responseData)
    })
    
    }
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center'>
        <div className='w-[300px] h-[520px] flex flex-col mt-10 items-center bg-red-100 md:w-[500px]'>
                <span className='text-ld font-bold text-center mt-4'>Upload New Post</span>
                <label htmlFor="image" className='mt-10'><img className='w-[280px] h-[250px]' src={image?URL.createObjectURL(image):upload} alt="" /></label>
                <input id='image' type='file' className='hidden mt-10 w-[80%] h-[70%]' onChange={(e)=>setimage(e.target.files[0])}></input>
                <input type="text" placeholder='write caption' value={title.title} name='title' onChange={(e)=>settitle({...title,[e.target.name]:e.target.value})} className='mt-5 border-b-[0.5px] border-black w-[80%]'/>
                <Link className={`text-md  px-2 bg-black text-white rounded-full font-bold h-6 w-20 text-center  mt-10`} onClick={UploadPost}>Upload</Link>
            </div>
    </div>
  )
}

export default Upload