import React from 'react'
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {

    const [name, setName] = useState('')
    const [userId, setuserId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch =  useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) navigate(redirect)
    },[navigate ,redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
          const res = await register({name, userId, email, password}).unwrap()
          dispatch(setCredentials({...res})) 
          navigate(redirect) 
          toast.success("User Successfully Registered")
        } catch (error) {
            console.log(error)
            toast.error(error.data.message)
        }
    }

  return (
    <section className='flex justify-center items-center flex-wrap'>
        <div className='p-6 rounded-md user-container mr-[4rem] '>
            <h1 className='text-2xl text-center font-semibold mb-4'>Register</h1>

            <form 
            onSubmit={submitHandler}
            className='container w-[25rem]'>
                <div className='my-[2rem]'>
                    <label 
                    htmlFor="name" 
                    className='block text-sm font-medium'>
                        Name
                    </label>
                    <input 
                    type="text" 
                    id='name' 
                    placeholder='Enter name' 
                    className='mt-1 p-2 border rounded w-full'
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    />
                </div>

                <div className='my-[2rem]'>
                    <label 
                    htmlFor="userId" 
                    className='block text-sm font-medium'>
                        User Id
                    </label>
                    <input 
                    type="text" 
                    id='userId' 
                    placeholder='Enter User Id' 
                    className='mt-1 p-2 border rounded w-full'
                    value={userId}
                    onChange={e => setuserId(e.target.value)} 
                    />
                </div>

                <div className='my-[2rem]'>
                    <label 
                    htmlFor="email" 
                    className='block text-sm font-medium'>
                        Email
                    </label>
                    <input 
                    type="email" 
                    id='email' 
                    placeholder='Enter email' 
                    className='mt-1 p-2 border rounded w-full'
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    />
                </div>

                <div className='my-[2rem]'>
                    <label 
                    htmlFor="password" 
                    className='block text-sm font-medium'>
                        Password
                    </label>
                    <input 
                    type="password" 
                    id='password' 
                    placeholder='Enter password' 
                    className='mt-1 p-2 border rounded w-full'
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                    />
                </div>

                <button 
                disabled={isLoading}
                type='submit'
                className='bg-pink-500 text-white cursor-pointer px-4 py-2 my-[1rem] rounded'>
                    {
                        isLoading ? "Registering..." : "Register"
                    }
                </button>

                {
                    isLoading && <Loader />
                }
            </form>

            <div className='mt-4'>
                <p>Already have an account? {" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}
                className='text-pink-500 hover:underline'
                >
                    Login
                </Link>
                </p>
            </div>
        </div>
    </section>
  )
}

export default Register