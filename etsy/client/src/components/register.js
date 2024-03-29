import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { login, registerUser, activeShop } from "../features/userSlice";

function Register({ setShowRegister }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const addUser = (event) => {
   
    console.log(" in register axios ");
    Axios.post("http://54.82.11.107:4001/api/users/register", {
      email,
      username,
      password,
    }).then((response) => {
      if (response.data.success === true) {
        console.log("Success========: " + response.data.success);
        dispatch(
          registerUser({
            username: username,
            email: email,
          })
        );
        console.log("In frontend register");
        window.location.pathname = "/home";
      }
    });
  };

  return (
    <>
      <div className="bg-modal">
        <div className="modal-content">
          <div
            style={{
              marginTop: "30px",
              marginLeft: "20px",
              fontFamily: "Tahoma",
            }}
          >
            <h4>Register</h4>
          </div>
          <form className="signin_form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="email"
                className="email"
                id="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                className="username"
                id="username"
                placeholder="Enter username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>

            <div className="htmlForm-group">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                className="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="forgot_password"></div>
            <button onClick={addUser} type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
