import Axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productsList,
  updateProducts,
} from "../features/productsSlice";
import SearchIcon from "@mui/icons-material/Search";
import { updateUser } from "../features/userSlice";

function searchBar(props) {
  const dispatch = useDispatch();
  const prod = useSelector(getProducts);
  const [searchTerms, setSearchTerms] = useState("");
  const [searchValue, setSearchValue] = useState("");
  

  const handleSearchResult = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    if (searchValue !== "") {
      Axios.get(
        "http://54.82.11.107:4000/api/products/getSearchItems/" + searchValue
      ).then((response) => {
        if (response.data.success === true) {
          console.log(response.data.result);
          console.log(prod);
          if (prod === null || prod.length === 0) {
            console.log(" products is null");
            dispatch(productsList(response.data.result));
          } else {
            dispatch(updateProducts(response.data.result));
          }
        }
        window.location.pathname = "/searchResults";
      });
    } else {
      window.location.pathname = "/";
    }
  };

  return (
    <form className="search_form">
      <input
        type="text"
        // id="searchBar"
        className="searchBar"
        placeholder="Search for anything..."
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      ></input>

     
      <button type="submit" onClick={handleSearchResult} className="searchBtn">
        <SearchIcon className="searchIcon" />
      </button>
    </form>
  );
}

export default searchBar;
