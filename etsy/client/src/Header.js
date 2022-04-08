import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingBasket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import { Button } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import MessageIcon from "@material-ui/icons/Message";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// import GradingIcon from '@material-ui/icons/Grading';
import SettingsIcon from "@material-ui/icons/Settings";
import StorefrontIcon from "@material-ui/icons/Storefront";
// import LogoutIcon from '@material-ui/icons/Logout';

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

        {/* <div className="header_nav">
          <Link to="/" className="header_link">
            <div className="header_option">
              <FavoriteBorderIcon />
            </div>
          </Link>

          <Link to="" className="header_link">
            <div className="header_option">
              <Button className="header_optionLoginButton">
                  <AccountCircleIcon className="header_accountCircleIconLink" />
                <Link to="">
                  <ArrowDropDownIcon className="header_arrowDropDownIconLink" />
                </Link>
              </Button>
            </div>
          </Link>
          <Link to="/checkout" className="header_link">
            <div className="header_optionBasket">
              <ShoppingCartIcon />
              <span className="header_optionLineTwo header_basketCount">0</span>
            </div>
          </Link>
        </div> */}

        <Navbar>
          <Link>
            <NavItem icon={<FavoriteBorderIcon />} />
          </Link>
          <Link to="/login">
            <NavItem icon={<AccountCircleIcon />} />
          </Link>
          <Link>
            <NavItem icon={<ArrowDropDownIcon />}>
              <DropdownMenu></DropdownMenu>
            </NavItem>
          </Link>
          <Link>
            <NavItem icon={<ShoppingCartIcon />} />
          </Link>
        </Navbar>
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

// Dropdown B
function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar__nav">{props.children}</ul>
    </nav>
  );
}
function NavItem(props) {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <li className="navitem">
      <a
        href="#"
        className="icon_button"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {props.icon}
      </a>
      {openDropdown && props.children}
    </li>
  );
}
function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <a href="#" className="menu_item">
        <span className="icon_button">{props.leftIcon}</span>
        {props.children}
        <span className="icon_right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown">
      <DropdownItem leftIcon={<PersonIcon />}>View Your Profile</DropdownItem>
      <DropdownItem leftIcon={<CardGiftcardIcon />}>Gift Card</DropdownItem>
      <DropdownItem leftIcon={<MessageIcon />}>Messages</DropdownItem>
      <DropdownItem leftIcon={<LocalOfferIcon />}>Your Offers</DropdownItem>
      {/* <DropdownItem leftIcon={<GradingIcon/>}>Purchase and reviews</DropdownItem> */}
      <DropdownItem leftIcon={<SettingsIcon />}>Account Settings</DropdownItem>
      <DropdownItem leftIcon={<StorefrontIcon />}>Sell on Etsy</DropdownItem>
      {/* <DropdownItem leftIcon={<LogoutIcon/>}>Sign out</DropdownItem> */}
    </div>
  );
}

export default Header;
