import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userSlice, { selectUser } from "../../features/userSlice";
import CloseLogin from "../closeLogin";
import Axios from "axios";

const editShopImage = ({ editShopPage }) => {
  const [shopImage, setShopImage] = useState("");
  const [product, setProduct] = useState();
  const [productExist, setProductExist] = useState(false);
  const user = useSelector(selectUser);

  const editImage = (event) => {
    event.preventDefault();
    editShopPage(false);

    const formData = new FormData();
    formData.append("shopImage", shopImage);
    console.log("Inedit client axios " + user.id);
    Axios.put(
      "http://54.82.11.107:4000/api/users/updateShopImageById/" + user.id,
      formData
    ).then((res) => {
      if (res.data.success) {
        console.log("Item details edited successfully.....");

        console.log(response);
        
        console.log("Item details edited successfully.....");
        window.location.pathname = "/shopHome";
      }
    });
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = () => {
    Axios.get("http://54.82.11.107:4000/api/users/getShopById/" + user.id).then(
      (res) => {
        if (res) {
          console.log(res.data.user["shopImage"] + " shop image ");
          setShopImage(res.data.user["shopImage"]);
          console.log("Products stored in get shop by id");
        }
      }
    );
  };
  return (
    <div className="bg-modal">
      <div className="modal-content">
        <CloseLogin setshowSignIn={editShopPage} />
        <h2 className="addProd_title">Add product</h2>
        <form className="items_form" encType="multipart/form-data">
          <div className="htmlForm-group">
            <label htmlFor="item_image">Shop Image</label>
            <br />
            <input
              style={{ border: "none" }}
              type="file"
              name="shopImage"
              className="item_image"
              id="item_image"
              onChange={(e) => {
                setShopImage(e.target.files[0]);
              }}
              required
            />
          </div>

          <div>
            <button
              style={{
                marginTop: "5%",
                width: "90%",
                borderRadius: "4px",
                padding: "5px",
                backgroundColor: "gray",
                border: "none",
                color: "white",
              }}
              onClick={editImage}
            >
              Update Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default editShopImage;
