import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
const api = process.env.REACT_APP_SERVER
const defaultState = {
    email: "",
    password: ""
}
const Login = () => {
    const [login, setlogin] = useState(defaultState)
    const location = useNavigate()
    const HandleChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
        console.log(login)
    }
    const HandleClick = async () => {
        if (!((login.password.length !== 0) && (login.email.length !== 0))) {
            toast.error("this field cantnot be empty")
        }else{
            fetch(`${api}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login)
            }).then(res => res.json()).then((data) => {
                if (data.sucess) {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("id",data.data._id)
                    toast.success(data.msg)
                    location("/")
                    window.location.reload()
                } else {
                    toast.error(data.msg)
                }
            })
        }
    }
    return (
        <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
            <div className='bg-white p-2 md:p-10  text-black w-[300px] md:w-[500px] lg:w-[600px] shadow-slate-950' style={{ boxShadow: "2px 2px 2px 10px black" }}>
                <div className='flex justify-center'>
                    <span className='text-2xl font-bold text-center  '>Login</span>
                </div>
                <div className='flex flex-col mt-10'>
                    <label htmlFor="email">Email</label>
                    <input id='email' type="email" name='email' value={login.email} onChange={HandleChange} className='border-black border-b-2 w-[100%]' />
                </div>
                <div className='flex flex-col mt-3'>
                    <label htmlFor="Password">Password</label>
                    <input id='password' type="password" name='password' value={login.password} onChange={HandleChange} className='border-black border-b-2 w-[100%]' />
                    <Link to="/signup" className='mt-3 text-[12px]'>Dont have an account? <span className='text-blue-500'>click here</span></Link>
                </div>
                <div className='flex justify-center mt-10'>

                    <Link className='text-md  px-2 bg-black text-white rounded-full font-bold h-6 w-20 text-center' onClick={HandleClick} >Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Login