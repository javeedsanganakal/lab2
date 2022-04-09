import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import "./ProfileDashboard.css"


function ProfileDashboard() {
      return (

        <div className="profileDashboard">
          <h2>Your Profile</h2>
          <img className="profileDashboard__img" src="https://myhero.com/content/images/thumbs/0130114_steve-jobs.jpeg" alt="John"/>
          <PhotoCameraIcon className="profileDashboard__photoCameraIcon"/>
          <h1>Steve</h1>
          <p className="profileDashboard__title">CEO</p>
          <p>California</p>
          <div>
            <a href="#"><i className=""></i></a> 
            <a href="#"><i className=""></i></a>  
            <a href="#"><i className=""></i></a>  
            <a href="#"><i className=""></i></a> 
          </div>
          <button className="profileDashboard__button">Contact</button>
        </div>
      );
  }




export default ProfileDashboard;
