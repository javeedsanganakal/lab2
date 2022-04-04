import React, { useState } from 'react';
import "./Login.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [errorMessage, seterrorMessage] = useState(null);
  const history = useHistory();
  const login = e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username, 
      password: password,
     }).then((response) => {
       <Route render={response.data.message ? (seterrorMessage(response.data.message)) :
       (history.push("/"))} />
      // console.log(response.data[0].username);
      });
  };
  return (
    <div className="login">
        <Link to="/">
           <img
             className="login_logo"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png"
             alt="logo"
           />
        </Link>
      <div className="login_container">
        <div className="login_header">
          <p>Sign In</p>
          <button className="login_registerButton">
             <Link to="/Register" className="login_linkRegisterButton">
             Register
            </Link>
          </button> 
        </div>
        <div className='login_errorMessage'>
        <p>{errorMessage}</p>
        </div>
        <form>
          <h5>Username</h5>
          <input type="username" onChange={(e) => {setUsername(e.target.value)}}/>
          <h5>Password</h5>
          <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
          <button type="submit" className="login_signinButton" onClick={login}>Sign In</button>
        </form>
        <p>
          By clicking Sign in, you agree to Etsy's Terms of Use and Privacy 
          Policy.
        </p>       
      </div>
    </div>
  );
}
export default Login;

