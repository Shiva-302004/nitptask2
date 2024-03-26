import React, { useEffect, useState } from 'react'
import { FcComments } from "react-icons/fc";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import upload from "../components/upload_area.png"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Mypost = () => {
    const [post, setpost] = useState([])
    // const [click, setclick] = useState([])
    // const [like, setlike] = useState([])
    const [image, setimage] = useState()
    const [title, settitle] = useState({
        title: "",
        photo: ""
    })
    const UploadPost = async (e) => {
        e.preventDefault()
        if(localStorage.getItem("token")){

            let product = title
    
            let formdata = new FormData()
            formdata.append('file', image)
    
            fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/upload`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "token": localStorage.getItem("token")
                },
                body: formdata
            })
                .then((res) => res.json()).then((data) => {
                    if (data.sucess) {
                        product.photo = data.data.url
                        console.log(product)
                        fetch('https://backendimageapp.onrender.com/api/v1/photos/uploadpost', {
                            method: "POST",
                            headers: {
                                "Content-Type": "Application/json",
                                "token": localStorage.getItem("token")
                            },
                            body: JSON.stringify(product),
                        }).then((res) => res.json()).then((data) => {
                            if (data.success) {
                                // console.log(data.data)
                                toast.success(data.msg)
                                setpost([...post, data.data])
                            } else {
                                toast.error(data.msg)
                            }
                        }).catch((err) => console.log(err))
                    }
                    // console.log(product)
                    // console.log(responseData)
                })
        }else{
            toast.error("please login")
        }

    }


    useEffect(() => {
        if(localStorage.getItem("token")){

            fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/userposts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            }).then(res => res.json()).then((data) => setpost(data.data))
        }
        // console.log(post)
    }, [])


    const handleClick = (id) => {
        fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/likeofpost/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            }
        }).then(res=>res.json()).then((data)=>{
            // console.log(data)
            const newdata=post.map((item)=>{
                if(item._id===data?.data?._id){
                    return data.data
                }else{
                    return item
                }
            })
            // setlike(data.data.likes)
            setpost(newdata)
        })
    }
    const handleClick2=(id)=>{
        fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/decrementoflikeofpost/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            }
        }).then(res=>res.json()).then((data)=>{
            // console.log(data)
            const newdata=post.map((item)=>{
                if(item._id===data?.data?._id){
                    return data.data
                }else{
                    return item
                }
            })
            // setlike(data.data.likes)
            setpost(newdata)
        }).catch((err)=>console.log(err))
    }
    const HandleDelte = (id) => {
        fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/deletepost/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        }).then(res => res.json()).then((data) => {
            // console.log(data)
            if (data.sucess) {
                setpost(data.data)
                toast.success(data.msg)
            } else {
                toast.error(data.msg)
            }
        })
    }
    return (
        <div className='flex flex-col pt-10 justify-center items-center'>
            <div className='w-[100%] h-[100%] flex justify-center items-center'>
                <div className='w-[300px] h-[520px] flex flex-col mt-10 items-center bg-yellow-100 md:w-[500px]'>
                    <span className='text-ld font-bold text-center mt-4'>Upload New Post</span>
                    <label htmlFor="image" className='mt-10'><img className='w-[280px] h-[250px]' src={image ? URL.createObjectURL(image) : upload} alt="" /></label>
                    <input id='image' type='file' className='hidden mt-10 w-[80%] h-[70%]' onChange={(e) => setimage(e.target.files[0])}></input>
                    <input type="text" placeholder='write caption' value={title.title} name='title' onChange={(e) => settitle({ ...title, [e.target.name]: e.target.value })} className='mt-5 border-b-[0.5px] border-black w-[80%]' />
                    <Link className={`text-md  px-2 bg-black text-white rounded-full font-bold h-6 w-20 text-center  mt-10`} onClick={UploadPost}>Upload</Link>
                </div>
            </div>
            <div className='text-2xl text-white mt-10'>MY POSTS</div>
            <div className="pt-10 text-center">
                {
                    localStorage.getItem("token") ?
                        <>
                            {
                                post?.length === 0 ?
                                    <h1 className='text-white'>You have Uploaded No photos yet</h1>
                                    :
                                    <div className='flex justify-center items-center flex-col'>
                                        {
                                            post?.map((item, id) => {
                                                return <div className='w-[250px] h-[420px] md:w-[600px] md:h-[620px] lg:w-[800px] lg:h-[820px] border-black border-2 bg-white flex flex-col ml-3 mt-3 rounded-md' key={item._id}>
                                                    <div className='h-[60px] flex  items-center'>
                                                        <img src={item.photo} className='w-[40px] h-[40px] ml-2 rounded-full' alt="" />
                                                        <span className='text-md ml-5 uppercase font-bold'>{item.name}</span>
                                                    </div>
                                                    <div className='h-[0.5px] w-[100%] bg-black'></div>
                                                    <div className='h-[240px] w-[100%]'>
                                                        <img src={item.photo} className='h-[240px] w-[100%] md:h-[431px] lg:h-[640px]' alt="" />
                                                    </div>
                                                    <div className='relative md:mt-[32%] lg:mt-[50%]'>

                                                    <div className='h-[0.5px] w-[100%] bg-black'></div>
                                                    <div className='h-[50px] md:h-[70px] w-[100%] flex'>
                                                        <div className=' flex flex-col w-[50px] h-[50px] md:h-[60px] md:mt-2' >
                                                            <div className="w-[50px] h-[50px] md:h-[60px]">
                                                                {
                                                                    item?.likes.includes(localStorage.getItem("id"))?<IoMdHeart className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' onClick={() => handleClick2(item._id)}></IoMdHeart>:<IoIosHeartEmpty className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' onClick={() => { handleClick(item._id) }} ></IoIosHeartEmpty>
                                                                }
                                                            </div>
                                                            <span className='-ml-5 -mt-1 md:-mt-1 md:ml-1 lg:ml-3'>{item?.likes?.length}</span>
                                                        </div>
                                                        <div className=' flex flex-col w-[50px] h-[50px] md:h-[60px] md:mt-2' >
                                                            <div className="w-[30px] h-[30px]">
                                                                <Link to={`/comments/${item._id}`}><FcComments className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' /></Link>
                                                            </div>
                                                            <span className='-ml-5 -mt-1 md:mt-1 md:ml-1 lg:ml-3'>{item.comments.length}</span>
                                                        </div>
                                                        <div className=' flex flex-col w-[50px] h-[50px] md:h-[60px] md:w-[60px] md:mt-2 lg:w-[70px]' >
                                                            <div className="w-[30px] h-[30px]">
                                                                <MdDelete className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' onClick={() => HandleDelte(item._id)} />
                                                            </div>
                                                            <span className='-ml-5'></span>
                                                        </div>
                                                    </div>
                                                    </div>

                                                    <div className='h-[0.5px] w-[100%] bg-black mt-2'></div>
                                                    <span className='text-md ml-2 flex justify-start'><span className='text-[grey] mr-6'>{item.name}</span>{item.title}</span>
                                                </div>
                                            })
                                        }
                                    </div>
                            }
                        </>
                        :
                        <h1 className='mt-10 text-white'> please Login to see</h1>
                }

            </div>
        </div>
    )
}

export default Mypost