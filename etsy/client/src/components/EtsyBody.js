import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  favouritesList,
  getAllFavourites,
  getAllItems,
  getAllProducts,
  getProducts,
  updateFavourites,
} from "../features/productsSlice";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { selectUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import { productOverview } from "../features/cartSlice";
import ProductOverView from "./ProductOverView";

function EtsyBody() {
  const dispatch = useDispatch();
 
  const products = useSelector(getAllProducts);
  const user = useSelector(selectUser);
 
  const [favourites, setFavourites] = useState([]);
  const [items, SetItems] = useState([]);
  const [favouriteIcon, setFavoutriteIcon] = useState(false);
  const [prodLen, setProdLen] = useState(0);


  useEffect(() => {
    getItems();
    
  }, []);

  const getItems = () => {
    Axios.get("http://54.82.11.107:4000/api/products/getItems").then(
      (res) => {
        if (res.data.success === true) {
          console.log(res.data.result);
          dispatch(getAllItems(res.data.result));

          for (let i = 0; i < res.data.result.length; i++) {
            // console.log(res.data.result[i].itemId);
            const updateItems = [
              ...items,
              {
                itemId: res.data.result[i].itemId,
                userId: res.data.result[i].userId,
                itemName: res.data.result[i].itemName,
                itemCategory: res.data.result[i].itemCategory,
                itemPrice: res.data.result[i].itemPrice,
                itemDescription: res.data.result[i].itemDescription,
                itemCount: res.data.result[i].itemCount,
                itemImage: res.data.result[i].itemImage,
              },
            ];
            SetItems(updateItems);
            // console.log("-------------geting all Product----------------");
          }
        }
      }
    );
  };

  const getFavourites = () => {
    if (user !== null) {
      Axios.get(
        "http://54.82.11.107:4000/api/products/getFavourites/" + user.id
      ).then((res) => {
        console.log("user id for favourites" + user.id);
        console.log(res.data.result);
        if (res.data.success === true) {
          dispatch(favouritesList(res.data.result));
        }
      });
    }
  };

  const handleFavourite = (itemId, userId) => {
    console.log("Favourites added " + itemId + " " + userId);
    Axios.post("http://54.82.11.107:4000/api/products/addFavourite", {
      itemId: itemId,
      userId: userId,
    }).then((res) => {
      if (res.data.success === true) {
        console.log(res.data.result);
        console.log("new fav added");
        
      }
    });
  };

  const handleOpenImage = (product) => {
    // console.log(product.itemId);
    // console.log(product.itemImage);
    dispatch(productOverview(product));
    // console.log(product.itemCount);
    // setProductOverview(true);
    let redirectVar = null;
    if (user === null || !cookie.load("user")) {
      console.log("cookie is found " + user);
      redirectVar = <Navigate to="/home" />;
    } else {
      window.location.pathname = "/productOverview";
    }
  };

  var renderProducts = null;

  renderProducts = products.map((product) => {
    return (
      <div
        className="home_cards col-md-4 mb-4"
        style={{
          boxShadow: "2px 2px 2px 2px #888888",
          backgroundColor: "lightgray",
        }}
      >
        <div className="home_card card">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "5px",
            }}
            // className="favourite_icon"
            onClick={() => {
              handleFavourite(product._id, user.id);
            }}
          >
            {/* {toggleFavourites} */}
            <FavoriteTwoToneIcon />
            {/* {favourites.itemId === products.itemId &&
              favourites.userId === user.id} */}
          </div>
          <img
            src={product.itemImage}
            className="home_image card-img-top"
            alt="..."
            onClick={() => {
              handleOpenImage(product);
            }}
          />
          {/* <p className="home_prices">&nbsp;</p> */}

          <div className="card-body">
            <h5 className="card-title">{product.itemName}</h5>
            <p className="card-title">
              Price:
              {localStorage.getItem("preferedCurrency") === null
                ? "$"
                : localStorage.getItem("preferedCurrency")}
              {product.itemPrice}
            </p>
            <p className="card-text">{pro.itemDescription}</p>
            <button
              className="btn-sm btn-dark"
              style={{ backgroundColor: "orange" }}
            >
              View Product
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className="etsy_body"
      style={{
        // backgroundColor: "red",
        marginTop: "10%",
        marginLeft: "3%",
        marginRight: "3%",
      }}
    >
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-9">
            {/* {products.length} */}
            {products.length === 0 ? (
              <div></div>
            ) : (
              <div className="row">{renderProducts}</div>
            )}
          </div>
          {/* <div className="col-md-3">
            {products.length === 0 ? (
              ""
            ) : (
              <p className="categories_title">
                Items you may like from all the shops
              </p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default EtsyBody;
