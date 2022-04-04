import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Button } from "react-bootstrap";

function Header({ data }) {
  const [fliteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  return (
    <div>
      <nav className="header">
        {/* Etsy Header Requirement */}
        {/* Logo Image */}
        <Link to="/">
          <img
            className="header_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png"
            alt=""
          ></img>
        </Link>
        <div className="header_search">
          {/* Search Input */}

          <input
            type="text"
            className="header_searchInput"
            placeholder="Search for anything"
            value={wordEntered}
            onChange={handleFilter}
          />
          {fliteredData.length === 0 ? (
            ""
          ) : (
            <CloseIcon className="header_closeIcon" onClick={clearInput} />
          )}

          {/* Search Button Icon */}
          <SearchIcon className="header_searchIcon" />
        </div>

        <div className="header_nav">
          {/* href causes a page refresh, Link wont refresh the page */}
          <Link to="/" className="header_link">
            <div className="header_option">
              <FavoriteBorderIcon />
            </div>
          </Link>

          <Link to="" className="header_link">
            <div className="header_option">
              <Button className="header_optionLoginButton">
                <Link to="/login">
                  <AccountCircleIcon className="header_accountCircleIconLink" />
                </Link>
                <Link to="/checkout">
                  <ArrowDropDownIcon className="header_arrowDropDownIconLink" />
                </Link>
              </Button>
            </div>
          </Link>

          <Link to="/checkout" className="header_link">
            <div className="header_optionBasket">
              <ShoppingBasketIcon />
              <span className="header_optionLineTwo header_basketCount">0</span>
            </div>
          </Link>
        </div>

        {/* Sign in */}
        {/* Favourites heart Icon */}
        {/* Cart Icon*/}
      </nav>

      {/* Show filter result */}

      {fliteredData.length !== 0 && (
        <div className="header_searchDataResult">
          {fliteredData.slice(0, 10).map((value, key) => {
            return (
              <a
                className="header_searchDataResultLink"
                href={value.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{value.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Header;
