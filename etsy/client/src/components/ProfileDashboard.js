import React, { useState, useEffect } from "react";
import { PhotoCameraOutlined, EditOutlined } from "@material-ui/icons";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {
  favouritesList,
  getAllFavourites,
  updateFavourites,
} from "../features/productsSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { Navigate } from "react-router-dom";

function profileDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [favProdS, setFavProds] = useState([]);
  const favProds = useSelector(getAllFavourites);
  const [numOfFav, setNumOfFav] = useState(0);

  useEffect(() => {
    getFavouriteItems();
  }, []);

  const getFavouriteItems = () => {
    Axios.get(
      "http://54.82.11.107:4000/api/products/getFavourites/" + user.id
    ).then((res) => {
      console.log(res.data.result);
      if (res.data.success === true) {
        console.log("geting all fav products and storing in redux");
        

        dispatch(favouritesList(res.data.result));

        console.log(res.data.result.length);
        console.log(res.data.result);
      }
    });
  };

  const editProfile = () => {
    navigate("/updateProfile");
  };

  const handleFavourite = (favId) => {
    console.log("Favourites deletd" + favId);
    Axios.delete(
      "http://54.82.11.107:4000/api/products/deleteFavourite/" + favId
    ).then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        console.log("item deleted successfully");
        console.log(res.data.res);
        window.location.pathname = "/profile";
      }
    });
  };

  let renderFavourites = null;
  console.log(favProds);
  if (favProds === null) {
    renderFavourites = () => {
      return <div>No Favourites added</div>;
    };
  } else {
    renderFavourites = favProds.map((product) => {
      // console.log("ItemImage " + product.itemId["itemImage"]);
      return (
        <div className="home_cards col-md-4 mb-4">
          <div className="home_card card">
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "5px",
              }}
              className="favourite_icon"
              onClick={() => {
                handleFavourite(product._id);
              }}
            >
              <FavoriteBorderIcon />
            </div>
            <img
              src={product.itemId["itemImage"]}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{product.itemId["itemName"]}</h5>
              <h6>Price: ${product.itemId["itemPrice"]}</h6>
              <p className="card-text">{product.itemId["itemDescription"]}</p>
              {/* <button className="btn-sm btn-dark">Edit</button> */}
            </div>
          </div>
        </div>
      );
    });
  }

  let redirectVar = null;
  if (user === null || !cookie.load("user")) {
    console.log("cookie is found " + user);

    redirectVar = <Navigate to="/home" />;
  }
  return (
    <div>
      {redirectVar}
    
      <div className="profile_dashboard">
       

        
        <div className="profile_name">Favourites</div>
        

        <div className="profile_favourites">
          <div className="container-fluid mx-1">
            <div className="row mt-5 mx-1">
              <div className="col-md-9">
                <div className="row"> {renderFavourites} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profileDashboard;
