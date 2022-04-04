import React from 'react'
import './UserProfile.css';
import Header from "./Header";
import Category from "./Category";
import Welcome from "./Welcome";
// import Body from "./Body";
// import Home from "./Home";
// import Login from "./Login";
// import Register from "./Register";


function UserProfile() {
  
  return (
    <div className="app">
          <Header/>
          <Category/>
          <Welcome/>
    </div>
  )
}

export default UserProfile