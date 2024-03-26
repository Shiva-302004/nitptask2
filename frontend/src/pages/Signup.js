import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
const defaultState = {
    email: "",
    password: "",
    name: ""
}
const api=process.env.REACT_APP_SERVER
const Signup = () => {
    const [login, setlogin] = useState(defaultState)
    const location=useNavigate()
    const HandleChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
        console.log(login)
    }
    const handleClick=async()=>{
        if(!((login.name.length!==0)&&(login.password.length!==0)&&(login.email.length!==0))){
           toast.error("this field cant be empty")
        }else{

            fetch(`${api}/api/v1/auth/signup`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(login)
            }).then(res=>res.json()).then((data)=>{
                if(data.success){
                    localStorage.setItem("token",data.token)
                    localStorage.setItem("id",data.data._id)
                    location("/")
                    window.location.reload()
                    toast.success(data.msg)
                }else{
                    toast.error(data.msg)
                }
            })
        }
    }
    return (
        <div className='flex justify-center items-center h-[100vh] w-[100vw]' >
            <div className='bg-white p-2 md:p-10  text-black w-[300px] md:w-[500px] lg:w-[600px] shadow-slate-950' style={{ boxShadow: "2px 2px 2px 10px black" }}>
                <div className='flex justify-center'>
                    <span className='text-2xl font-bold text-center  '>Signup</span>
                </div>
                <div className='flex flex-col mt-3'>
                    <label htmlFor="name">Name</label>
                    <input id='name' type="text" name='name' value={login.name} onChange={HandleChange} className='border-black border-b-2 w-[100%]' minLength={1}/>
                </div>
                <div className='flex flex-col mt-3'>
                    <label htmlFor="email">Email</label>
                    <input id='email' type="email" name='email' value={login.email} onChange={HandleChange} className='border-black border-b-2 w-[100%]'  />
                </div>
                <div className='flex flex-col mt-3'>
                    <label htmlFor="Password">Password</label>
                    <input id='password' type="password" name='password' value={login.password} onChange={HandleChange} className='border-black border-b-2 w-[100%]' />
                    <Link to="/login" className='mt-3 text-[12px]'>Already have an account? <span className='text-blue-500'>click here</span></Link>
                </div>
                <div className='flex justify-center mt-10'>

                    <Link className={`text-md  px-2 bg-black text-white rounded-full font-bold h-6 w-20 text-center `}  onClick={handleClick} >Signup</Link>

                </div>
            </div>
        </div>
    )
}

export default Signup