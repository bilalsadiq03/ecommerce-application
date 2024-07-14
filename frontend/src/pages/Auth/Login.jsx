import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'


const Login = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [login, {isLoading}] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'


    useEffect(() => {
        if (userInfo){
          navigate(redirect)
        } 
    }, [navigate, redirect, userInfo])
    

    const submitHandler = async (e) => {
      e.preventDefault()
      try {
        const res = await login({userId, password}).unwrap()
        const token = res.token;
        localStorage.setItem('token', token);
        
        dispatch(setCredentials({...res}))
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }


  return (
    <div>
      <section className="h-full flex justify-center items-center">
        <div className="p-6 rounded-md mr-[4rem] mt-[2rem] w-1/1.25 user-container">
          <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-[25rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-black"
               >
                User Id
              </label>
              <input
                type="text"
                id="userId"
                className="p-2 border rounded w-full"
                placeholder="Enter User Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-black">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
            </div>

        </div>
      </section>
    </div>
  );
}

export default Login