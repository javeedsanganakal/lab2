import "./CartItem.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFinalCart,
  createCartItem,
  removeCartItem,
  getCartItems,
} from "../features/cartItemsSlice";
import { Delete } from "@material-ui/icons";
import Axios from "axios";
import { selectUser } from "../features/userSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [giftOption, setGiftOption] = useState(false);
  const [giftDescription, setGiftDescription] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(
      createCartItem({
        userId: item.userId,
        itemId: item.itemId._id,
        itemName: item.itemId.itemName,
        itemPrice: item.itemId.itemPrice,
        itemImage: item.itemId.itemImage,
        itemDescription: item.itemId.itemDescription,
        qty: item.qty,
        itemCount: item.itemId.itemCount,
        giftMessage: "",
      })
    );
  }, []);

  const qtyChangeHandler = (quantity) => {
    Axios.post("http://54.82.11.107:4000/api/products/addToCart", {
      itemId: item.itemId._id,
      userId: user.id,
      quantity: Number(quantity),
    })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          console.log("Items added to cart successfully...");
          window.location.reload(true);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeHandler = (Id) => {
    console.log("remove");
    Axios.delete(
      "http://54.82.11.107:4000/api/products/deleteCartItem/" + Id
    ).then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        console.log("item deleted successfully");
        console.log(res.data.res);
        window.location.reload(true);
      }
    });

    
  };

  const giftOptions = (giftMessage, itemId) => {
    console.log("Added gift options");
    console.log(giftMessage + " " + itemId);
    dispatch(
      createCartItem({
        userId: item.userId,
        itemId: item.itemId._id,
        itemName: item.itemId.itemName,
        itemPrice: item.itemId.itemPrice,
        itemImage: item.itemId.itemImage,
        itemDescription: item.itemId.itemDescription,
        qty: item.qty,
        itemCount: item.itemId.itemCount,
        giftMessage: giftMessage,
      })
    );
  };

  return (
    <div
      className="cart_pag"
      style={{
        display: "flex",
        width: "100%",
        // backgroundColor: "green",
        height: "200px",
      }}
    >
      <div className="cartitem">
        <div className="cartitem__image">
          <img
            src={item.itemId.itemImage}
            alt={item.itemId.itemName}
            width={200}
            height={150}
          />
        </div>
        
       
        <select
          value={item.qty}
          onChange={(e) => qtyChangeHandler(e.target.value)}
          className="cartItem__select"
        >
          {[...Array(item.itemId.itemCount).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>

        <button
          className="cartItem__deleteBtn"
          onClick={() => removeHandler(item._id)}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
