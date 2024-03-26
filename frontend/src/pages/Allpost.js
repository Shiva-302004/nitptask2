import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { FcComments } from "react-icons/fc";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { toast } from 'react-toastify';
const Allpost = () => {
  const [post, setpost] = useState([])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/allposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then((data) => setpost(data.data))
    // console.log(post)
  }, [])


  const handleClick = (id) => {
    if(localStorage.getItem("token")){

      fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/likeofpost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        }
      }).then(res => res.json()).then((data) => {
        // console.log(data)
        const newdata = post.map((item) => {
          if (item._id === data?.data?._id) {
            return data.data
          } else {
            return item
          }
        })
        // setlike(data.data.likes)
        setpost(newdata)
      })
    }else{
      toast.error("please login")
    }
  }
  const handleClick2 = (id) => {
    if(localStorage.getItem("token")){

      fetch(`${process.env.REACT_APP_SERVER}/api/v1/photos/decrementoflikeofpost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        }
      }).then(res => res.json()).then((data) => {
        // console.log(data)
        const newdata = post.map((item) => {
          if (item._id === data?.data?._id) {
            return data.data
          } else {
            return item
          }
        })
        // setlike(data.data.likes)
        setpost(newdata)
      }).catch((err) => console.log(err))
    }else{
      toast.error("please login")
    }
  }
  return (
    <div className='flex flex-col pt-10 justify-center items-center'>
      <div className="pt-10 text-center">

        <>
          {
            post?.length === 0 ?
              <h1>No photos yet</h1>
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
                                item?.likes.includes(localStorage.getItem("id")) ? <IoMdHeart className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' onClick={() => handleClick2(item._id)}></IoMdHeart> : <IoIosHeartEmpty className='w-[30px] h-[30px] md:w-[60px] md:mt-2 lg:w-[70px]' onClick={() => { handleClick(item._id) }} ></IoIosHeartEmpty>
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


      </div>
    </div>
  )
}

export default Allpost