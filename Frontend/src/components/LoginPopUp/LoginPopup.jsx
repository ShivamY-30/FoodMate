import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './LoginPopup.css';
import { RiCloseLargeFill } from "react-icons/ri";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setToken } from '../../Store/tokenSlice';// Correct import statement
// For toasting the upload succesfull message
import { toast } from 'react-toastify'





const LoginPopup = ({ setshowLogin }) => {


    const url = "http://localhost/8000";
    // http://localhost:8000/api/user/login

    const dispatch = useDispatch();
    

    // FOr token ie login functionality 
    const token = useSelector((store) => store.token);
    // console.log(token);

  const [currState, setCurrState] = useState("Login");
  const [data , setdata] = useState({
    name : "",
    email : "",
    password : ""
  })

  const onChangeHandler  = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setdata(data =>   ({...data , [name]:value}))
    
  }

  const onLogin = async (event) =>{ 
    setshowLogin(false)
    let newUrl;
    event.preventDefault();
    if (currState === "Login"){
      newUrl = "http://localhost:8000/api/user/login";
    }else{
      newUrl = "http://localhost:8000/api/user/register";
    }

    const response = await axios.post(newUrl , data);
    if (response.data.success) {
      // setShowLogin(false);
      // console.log();
      toast.success("login Succesfull");
      dispatch(setToken(response.data.token));
      // console.log(response.data.token);
      // setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }

  // useEffect(()=>{
  //   // console.log(data);
  // }, [data])
  

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <span type="button" onClick={() => setshowLogin(false)}><RiCloseLargeFill /></span>
        
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : <input name='name' onChange={onChangeHandler}  value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler}  value={data.email} type="email" placeholder='Your email'   />
          <input name='password' onChange={onChangeHandler}  value={data.password} type="password" placeholder='Password'  />
        </div>
        <button type='submit'  >{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required  />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ?
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;
