import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './pages/Auth/Navigation.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
// import Footer from './components/Footer.jsx'

function App() {
  

  return (
    <>
    <ToastContainer />
    <Navigation />
    <main className='py-3'>
      <Outlet />
    </main>
    {/* <Footer /> */}
    </>
  )
}

export default App
