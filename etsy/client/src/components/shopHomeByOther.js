import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createProducts,
  getUserId,
  userDetails,
  userId,
} from "../features/shopSlice";
import { selectUser } from "../features/userSlice";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
// import ShopHeader from "./shopHeader";
import ShopHeaderByOther from "./shopHeaderByOther";
import ShopHomeOtherUser from "./shopHomeOtherUser";

function shopHomeByOther() {
  const { itemId } = useParams(); //itemId
  const { userId } = useParams();
  const [userIdFromSearch, setUserIdFromSearch] = useState();
  
  const [userInfo, setUserInfo] = useState("");
  const [itemsByUser, setItemsByUser] = useState([]);
  const dispatch = useDispatch();
  const userid = useSelector(getUserId);

  useEffect(() => {
    
    getItemsFromUserid();
    getUserDetails();
  });

  const getUserIdFromItemId = () => {
    Axios.get("http://54.82.11.107:4000/getItemById/" + itemId).then(
      (res) => {
        if (res) {
          dispatch(userId(res.data[0].userId));
        }
      }
    );
  };

  const getItemsFromUserid = () => {
    Axios.get(
      "http://54.82.11.107:4000/api/products/getAllProducts/" + userId
    ).then((res) => {
      if (res) {
        console.log(res.data.result);
        
        dispatch(createProducts(res.data.result));
      }
    });
  };

  const getUserDetails = () => {
    Axios.get("http://54.82.11.107:4000/api/users/getShopById/" + userId).then(
      (res) => {
        if (res) {
          console.log(res);
          // setUserInfo(res.data.result[0]);
          dispatch(userDetails(res.data.user));
          // console.log(res.data.result[0].name);
        }
      }
    );
  };

  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <h1>{userIdFromSearch}</h1>

      <ShopHeaderByOther />
      <ShopHomeOtherUser />
    </div>
  );
}

export default shopHomeByOther;
