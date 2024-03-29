import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Register from "./register";
import CloseLogin from "./closeLogin";
import { useHistory } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import { login, activeUser, activeShop } from "../features/userSlice";
import { backendURL } from "./config.json";
import jwt_decode from "jwt-decode";

function Signin({ setshowSignIn }) {
  // const history = useHistory();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const [loginStatus, setLoginStatus] = useState(null);

  const [token, setToken] = useState();
  const dispatch = useDispatch();

  const handleRegister = () => {
    setShowRegister(true);
  };

  Axios.defaults.withCredentials = true;

  const checkUser = (e) => {
    e.preventDefault();
    Axios.post("http://54.82.11.107:4000/api/users/signin", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log(response.data.user["email"] + " about ");
          console.log("In frontend signin");
          setToken(response.data.token);
          dispatch(
            login({
              id: response.data.user["_id"],
              email: response.data.user["email"],
              name: response.data.user["name"],
              shopName: response.data.user["shopName"],
              dob: response.data.user["dob"],
              gender: response.data.user["gender"],
              city: response.data.user["city"],
              phoneNumber: response.data.user["phoneNumber"],
              profilePic: response.data.user["profilePic"],
              about: response.data.user["about"],
              shopImage: response.data.user["shopImage"],
              loggedIn: true,
            })
          );

          window.location.pathname = "/home";
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid credentials");
      });
  };

  useEffect(() => {
    Axios.get("http://54.82.11.107:4000/api/users/signin").then((response) => {
      // console.log(response);

      if (response.data.success === true) {
        setLoginStatus(response.data.user);
        console.log(loginStatus);
        console.log("++++++++++ cookie ++++++++++++" + cookie.load("user"));
      }
    });
  }, []);

  let redirVal = null;
  if (token) {
    console.log(token);
    localStorage.setItem("token", token);

    var decoded = jwt_decode(token.split(" ")[1]);
    localStorage.setItem("user_id", decoded._id);
    localStorage.setItem("username", decoded.username);

    redirVal = <Navigate to="/home" />;
    // setLoginStatus(null);
  }

  return (
    <>
      {redirVal}
      <div className="bg-modal">
        <div className="modal-content">
          <CloseLogin setshowSignIn={setshowSignIn} />
          <div className="signin_heading">
            <h4>Sign in</h4>
            {/* <button
              // onClick={handleRegister}
              className="register-btn btn-primary"
            >
              Register
            </button> */}
          </div>
          <form className="signin_form">
            <span style={{ color: "red" }}>{error}</span>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="email"
                className="email"
                id="email"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
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
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="forgot_password">
              {/* <p className="password_forgot">Forgot your password?</p> */}
            </div>
            <button
              onClick={checkUser}
              type="submit"
              className="btn btn-primary"
            >
              Sign In
            </button>
          </form>
          <div className="google_signin">
            <p style={{ textAlign: "center", marginTop: "5px" }}>OR</p>
            <button
              // onClick={checkUser}
              onClick={handleRegister}
              type="submit"
              className="googleauth_btn"
            >
              Register
            </button>
          </div>
        </div>
        {showRegister === true && (
          <Register setShowRegister={setShowRegister} />
        )}
      </div>
    </>
  );
}

export default Signin;
