import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Axios from "axios";

// Components
// import CartItem from "../components/CartItem";

// Actions
// import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import {
  clearCart,
  createCartItem,
  createFinalCart,
  getCartItems,
} from "../features/cartItemsSlice";
import { selectUser } from "../features/userSlice";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";

const CartScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [finalAmount, setFinalAmount] = useState();

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;
  // const finalCartProduct = useSelector(getCartItems);

  const checkOutItems = useSelector(getCartItems);

  const [finalCartProducts, setFinalCartProducts] = useState([]);

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = () => {
    Axios.get(
      "http://54.82.11.107:4000/api/products/getCartItems/" + user.id
    ).then((response) => {
      console.log(response.data.result);
      if (response.data.success === true) {
        console.log("geting all fav products and storing in redux");
        console.log(response.data.result);
        setFinalCartProducts([...finalCartProducts, ...response.data.result]);
      }
    });
  };

  const removeFromCartHandler = (id) => {
    // dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    if (finalCartProducts === null) {
      return 0;
    } else {
      return finalCartProducts.reduce((qty, item) => Number(item.qty) + qty, 0);
    }
  };

  const getCartSubTotal = () => {
    if (finalCartProducts === null) {
      return 0;
    } else {
      return finalCartProducts
        .reduce((price, item) => price + item.itemId.itemPrice * item.qty, 0)
        .toFixed(2);
    }

    // setFinalAmount(finalPrice);
    // return finalPrice;
  };

  const handleCheckOut = async () => {
    console.log(checkOutItems.length);
    checkOutItems.map((product) => {
      console.log(product);
      Axios.post(
        "http://54.82.11.107:4000/api/products/addProductToPurchase/",
        {
          product: product,
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      const itemDetails = {
        itemCount: product.itemCount - product.qty,
        itemSales: product.qty,
      };

      Axios.put(
        "http://54.82.11.107:4000/api/products/editItemQtyById/" +
          product.itemId,
        itemDetails
      ).then((response) => {
        if (response.data.success) {
          console.log("Item details edited successfully.....");
        }
      });
    });

    Axios.delete("http://54.82.11.107:4000/api/products/clearCart")
      .then((response) => {
        if (response) {
          console.log("Items deleted successfully");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(clearCart());

    window.location.pathname = "/purchase";
  };

  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {finalCartProducts.length === 0 ? (
            <div>
              Your Cart Is Empty
              {/* <Link to="/">Go Back</Link> */}
            </div>
          ) : (
            finalCartProducts.map((item) => (
              <CartItem
                key={item}
                item={item}
                getCartSubTotal={getCartSubTotal}
                getCartCount={getCartCount}
                // qtyChangeHandler={qtyChangeHandler}
                // removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>
        <div
          className="cartscreen__right"
          style={{ marginTop: "80px", width: "30%" }}
        >
          <div className="cartscreen__info">
            <p>Subtotal {getCartCount()} items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button
              style={{ backgroundColor: "orange", color: "black" }}
              onClick={() => {
                handleCheckOut();
                // item.itemId,
                // item.itemImage,
                // item.itemName,
                // item.itemPrice,
                // item.qty
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;