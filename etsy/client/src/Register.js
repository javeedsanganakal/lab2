import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Register.css';
import Axios from "axios";



function Register() {
  const [emailReg, setEmailReg] = useState();
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () =>{
     Axios.post("http://localhost:3001/register", {
       email: emailReg, 
       username: usernameReg, 
       password: passwordReg
      }).then((response) => {
         console.log(response);
       });
  };

  return (
    <div className="register">
        <Link to="/">
           <img
             className="register_logo"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png"
             alt="logo"
           />
        </Link>
      <div className="register_container">
        <div className="register_header">
          <p>Sign Up</p>
          <button className="register_loginButton">
             <Link to="/Login" className="register_linkLoginButton">
             Login
            </Link>
          </button>
          
        </div>
        <form>
          <h5>E-mail</h5>
          <input type="email" onChange={(e) => {setEmailReg(e.target.value)}}/>
          <h5>Username</h5>
          <input type="username" onChange={(e) => {setUsernameReg(e.target.value)}}/>
          <h5>Password</h5>
          <input type="password" onChange={(e) => {setPasswordReg(e.target.value)}}/>
          {/* <h5>Confirm Password</h5>
          <input type="password" /> */}
          <button type="submit" className="register_signUpButton" onClick={register}>Sign Up</button>
        </form>
        <p>
          By clicking Sign in, you agree to Etsy's Terms of Use and Privacy 
          Policy.
        </p>
      </div>
    </div>
  )
}

export default Register