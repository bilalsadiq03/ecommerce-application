import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useProfileMutation, useUpdateUserMutation } from '../../redux/api/usersApiSlice'

const Profile = () => {

    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {userInfo} = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useUpdateUserMutation()

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    },[userInfo.email, userId.name])

    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProfile({_id : userInfo._id, name, password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success('Profile Updaated Successfully.')
        } catch (err) {
            toast.error(err.data.message)
        }
    }

  return (
    <div className="container mx-auto  p-4 mt-[2rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-2 border rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-2 border rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile