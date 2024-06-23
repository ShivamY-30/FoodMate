import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navabar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import LoginPopup from '../components/LoginPopUp/LoginPopup'
// For toasting the upload succesfull message
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreContextProvider from '../Store/StoreContextProvider'




const App = () => {

  const [showLogin , setshowLogin] = useState(false);
  return (
    <>
    <StoreContextProvider>
    <ToastContainer/>
    {showLogin?  <LoginPopup setshowLogin ={setshowLogin} /> : <></>}
    <div className='app'>
      <Navbar setshowLogin={setshowLogin}></Navbar>
      <Outlet/>
      <Footer></Footer>
    </div>
    </StoreContextProvider>
    </>
  )
}

export default App
