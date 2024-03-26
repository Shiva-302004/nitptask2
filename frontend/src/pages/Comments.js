import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FcComments } from "react-icons/fc";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { IoMdCloudUpload } from "react-icons/io";
import { toast } from 'react-toastify';
const Comments = () => {
    const { id } = useParams()
    const [comments, setcomments] = useState([])
    const [name, setname] = useState("")
    const [photo, setphoto] = useState("")
    const [likes, setlikes] = useState([])
    const [title, settitle] = useState("")
    const [idd, setid] = useState("")
    const [uploadcomment, setuploadcomment] = useState({
        title: ""
    })
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/comment/${id}`).then(res => res.json())
            .then((data) => {
                console.log(data)
                setcomments(data.data.comments)
                setname(data.data.name)
                setphoto(data.data.photo)
                setlikes(data.data.likes)
                settitle(data.data.title)
                setid("")
            })
        // console.log(comments)
    }, [])
    const handleClick2 = (idd) => {
        if (localStorage.getItem("token")) {

            fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/decrementoflikeofpost/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            }).then(res => res.json()).then((data) => {
                setlikes(data.data.likes)
            }).catch((err) => console.log(err))
        } else {
            toast.error("please login to comment")
        }
    }
    const handleClick = (idd) => {
        if (localStorage.getItem("token")) {

            fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/likeofpost/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            }).then(res => res.json()).then((data) => {
                setlikes(data.data.likes)
            })
        } else {
            toast.error("please login to comment")
        }
    }
    const handleupload = () => {
        if (localStorage.getItem("token")) {
            if (uploadcomment.title.length === 0) {
                toast.error("comment connot be empty")
            } else {

                fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/commentonpost/${id}`, {
                    method: "POST",
                    headers: {
                        "token": localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(uploadcomment)
                }).then(res => res.json()).then((data) => {
                    if (data.success) {
                        setcomments(data.data.comments)
                    } else {
                        toast.error(data.msg)
                    }
                })
            }
        } else {
            toast.error("please login to comment")
        }

    }
    return (
        <div className='pt-10 w-[100vw] flex flex-col md:flex-row justify-center items-center'>
            <div className='w-[80vw] h-[420px] md:w-[400px] md:h-[630px] lg:w-[500px]  lg:h-[820px] border-black border-2 bg-white flex flex-col ml-3 mt-3 rounded-md' >
                <div className='h-[60px] flex  items-center'>
                    <img src={photo} className='w-[40px] h-[40px] ml-2 rounded-full' alt="" />
                    <span className='text-md ml-5 uppercase font-bold'>{name}</span>
                </div>
                <div className='h-[0.5px] w-[100%] bg-black'></div>
                <div className='h-[240px] w-[100%]'>
                    <img src={photo} className='h-[240px] w-[100%] md:h-[431px] lg:h-[640px]' alt="" />
                </div>
                <div className='relative md:mt-[48%] lg:mt-[80%]'>

                    <div className='h-[0.5px] w-[100%] bg-black'></div>
                    <div className='h-[50px] md:h-[70px] w-[100%] flex'>
                        <div className=' flex flex-col w-[50px] h-[50px] md:h-[60px] md:mt-2' >
                            <div className="w-[50px] h-[50px] md:h-[60px]">
                                {
                                    likes.includes(localStorage.getItem("id")) ? <IoMdHeart className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' onClick={() => handleClick2(idd)}></IoMdHeart> : <IoIosHeartEmpty className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' onClick={() => { handleClick(idd) }} ></IoIosHeartEmpty>
                                }
                            </div>
                            <span className='ml-2 -mt-1 md:-mt-1 md:ml-4 lg:ml-6'>{likes?.length}</span>
                        </div>
                        <div className=' flex flex-col w-[50px] h-[50px] md:h-[60px] md:mt-2' >
                            <div className="w-[30px] h-[30px]">
                                <Link to={`/comments/${idd}`}><FcComments className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' /></Link>
                            </div>
                            <span className='ml-2 -mt-1 md:mt-1 md:ml-4 lg:ml-6'>{comments?.length}</span>
                        </div>

                    </div>
                </div>

                <div className='h-[0.5px] w-[100%] bg-black mt-2'></div>
                <span className='text-md ml-2 flex justify-start'><span className='text-[grey] mr-6'>{name}</span>{title}</span>
            </div>
            <div className='w-[80vw] h-[420px] md:w-[370px] md:h-[630px] lg:w-[500px]   lg:h-[820px]  bg-white flex flex-col ml-3 md:ml-0 md:mt-3 rounded-md'>
                <div className='w-[80vw] h-[320px] md:w-[370px] md:h-[530px] lg:w-[500px]   lg:h-[720px] overflow-scroll'>
                    {
                        comments.length === 0 &&
                        <span className='text-black text-center'> no comments yet</span>
                    }
                    {
                        comments?.map((item, id) => {
                            return <div key={id} className='flex m-2'>
                                <span className='text-[grey] font-bold'>{item.userid}</span>
                                <span className='font-thin ml-3'>{item.title}</span>
                            </div>
                        })
                    }
                </div>

                <div className='w-[100%] h-[0.5px] bg-black'></div>
                <div className='w-[80vw] h-[100px] md:w-[370px] md:h-[100px] lg:w-[500px] lg:h-[100px] flex'>
                    <input type="text" className='w-[80%] h-[70px] my-2 ml-3 border-black border-2' placeholder='write comment here.....' name='title' value={uploadcomment.title} onChange={(e) => { setuploadcomment({ ...uploadcomment, [e.target.name]: e.target.value }) }} />
                    <IoMdCloudUpload className='w-[15%] h-[70px] my-2 ml-3' onClick={handleupload} />
                </div>
            </div>
        </div>
    )
}

export default Comments