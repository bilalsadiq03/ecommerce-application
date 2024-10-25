import { useState } from 'react'
import { Outlet } from 'react-router-dom'
<<<<<<< HEAD
=======

>>>>>>> adb9fa60f5ec115ba9c1890b1d0549ff0b61dc75
import Navigation from './pages/Auth/Navigation.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


function App() {
  

  return (
    <>
    <ToastContainer />
    <Navigation />
    <main className='py-3'>
      <Outlet />
    </main>
    </>
  )
}

export default App
