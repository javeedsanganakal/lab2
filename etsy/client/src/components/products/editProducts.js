import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import CloseLogin from "../closeLogin";

function editProducts({ setShowProductsEditPage, itemId }) {
  const user = useSelector(selectUser);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [product, setProduct] = useState();
  const [productExist, setProductExist] = useState(false);

  const itemDetails = {
    itemName,
    itemPrice,
    itemDescription,
    itemCount,
  };

  const editItem = (event) => {
    // event.preventDefault();
    console.log("In edit item client axios");
    console.log(itemDetails);
    Axios.put(
      "http://54.82.11.107:4000/api/products/editItemById/" + itemId,
      itemDetails
    ).then((res) => {
      if (res.data.success) {
        console.log("Item details edited successfully.....");
      }
    });
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = () => {
    Axios.get(
      "http://54.82.11.107:4000/api/products/getItemById/" + itemId
    ).then((response) => {
      if (res) {
        console.log("In edit items page");

        setItemName(res.data.result[0]["itemName"]);
        setItemDescription(res.data.result[0]["itemDescription"]);
        setItemPrice(res.data.result[0]["itemPrice"]);
        setItemCount(res.data.result[0]["itemCount"]);
        setItemCategory(res.data.result[0]["itemCategory"]);
        setProduct(res.data.result[0]["itemCount"]);
        setProductExist(true);
      }
    });
  };
  return (
    <div className="bg-modal">
      <div className="modal-content">
        <CloseLogin setshowSignIn={setShowProductsEditPage} />
        {itemId}
        <h2 className="addProd_title">Edit product </h2>
        {console.log("==================Hello===================")}
        {console.log(product)}
        <form className="items_form" encType="multipart/form-data">
          <div className="htmlForm-group">
            <label htmlFor="item_name">Item Name</label>
            <br />
            <input
              type="text"
              className="item_name"
              id="item_name"
              //   placeholder="Item Name"
              defaultValue={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              required
            />
          </div>

        

          <div className="htmlForm-group">
            <label htmlFor="item_price">
              Item Price <sub>In dollars</sub>
            </label>
            <br />
            <input
              type="text"
              className="item_price"
              id="item_price"
              placeholder="Item Price"
              min="1"
              defaultValue={itemPrice}
              onChange={(e) => {
                setItemPrice(e.target.value);
              }}
              required
            />
          </div>

          <div className="htmlForm-group">
            <label htmlFor="item_des">Item Description</label>
            <br />
            <input
              type="text"
              className="item_des"
              id="item_des"
              placeholder="Item Description"
              defaultValue={itemDescription}
              onChange={(e) => {
                setItemDescription(e.target.value);
              }}
              required
            />
          </div>

          <div className="htmlForm-group">
            <label htmlFor="item_count">Item Count</label>
            <br />
            <input
              type="text"
              className="item_count"
              id="item_count"
              placeholder="Item Count"
              min="1"
              defaultValue={product}
              onChange={(e) => {
                setItemCount(e.target.value);
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
              onClick={editItem}
            >
              Edit Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default editProducts;
