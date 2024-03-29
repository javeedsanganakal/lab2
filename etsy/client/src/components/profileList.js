import React from "react";
import {
  ShoppingCart,
  Person,
  NotificationsNoneSharp,
  FavoriteBorderSharp,
} from "@material-ui/icons";
import cookie from "react-cookies";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import {
  removeAllItemsFromHome,
  removeFavouritesList,
  removeProductsState,
} from "../features/productsSlice";

function profileList({ setShowProfileLists }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const showHomePage = () => {
    setShowProfileLists(false);
  };

  const loadProfilePage = () => {
    navigate("/updateProfile");
  };

  const handleSellOnEtsy = () => {
    navigate("/sellonetsy");
  };

  const handlePurchases = () => {
    navigate("/purchase");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    console.log("In sign out");
    dispatch(logout());
    dispatch(removeProductsState());
    dispatch(removeFavouritesList());
   
    cookie.remove("user", { path: "/" });
    window.location.pathname = "/";
  };

  
  return (
    <div>
     
      <div onClick={showHomePage} className="profile-modal">
        <div className="profile-content">
         
          <ul className="profile-icons">
            <li onClick={loadProfilePage} className="profile-icon">
             
              <br />
              <span style={{ fontSize: "14px" }}>Edit your profile</span>
            </li>
            <li className="profile-icon" onClick={handlePurchases}>
              Purchases and reviews
            </li>
            <li onClick={handleSellOnEtsy} className="profile-icon">
              Buy and Sell on Etsy
            </li>
            <li onClick={handleSignOut} className="profile-icon">
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profileList;
