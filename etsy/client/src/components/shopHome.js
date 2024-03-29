import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import { selectUser } from "../features/userSlice";
import AddProducts from "./products/addProducts";
import Axios from "axios";
import EditProducts from "./products/editProducts";
import EditItemImage from "./products/editItemImage";
import SearchFeature from "./Features/searchFeature";
import ShopHeader from "./shopHeader";
import EditShopImage from "./products/editShopImage";
import { getProducts } from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";

function shopHome() {
  const { id } = useParams(); //itemId
  const [searchItemDetails, setSearchItemDetails] = useState([]);
  const user = useSelector(selectUser);
  const product = useSelector(getProducts);
  const [products, setProducts] = useState([]);
  const [showProds, setShowProds] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const [showProductsAddPage, setShowProductsAddPage] = useState(false);
  const [postSize, setPostSize] = useState();
  const [showProductsEditPage, setShowProductsEditPage] = useState(false);
  const [productId, setProductId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState("");
  const [showShowImageEditPage, setShowShowImageEditPage] = useState(false);
  const [shop, setShop] = useState();
  const [shopImage, setShopImage] = useState();
  const [userId, setUserId] = useState(0);

  const addItems = () => {
    setShowProductsAddPage(true);
  };

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: limit,
    };
    viewItems(variables);
    // getItemsByItemSearchId();
  }, []);

  const getItemsByItemSearchId = () => {
    Axios.get(
      "http://54.82.11.107:4000/api/products/getItemsByItemSearchId/" + id
    ).then((response) => {
      console.log(response);
      if (response) {
        setSearchItemDetails(response.data.result);
      }
    });
  };

  const onLoadMore = () => {
    console.log(limit);
    console.log(skip);
    let skip = Skip + limit;
    console.log(skip + " in load more");
    const variables = {
      skip: skip,
      limit: limit,
      loadMore: true,
    };
    viewItems(variables);
    setSkip(skip);
  };

  var viewItems = (variables) => {
    console.log(variables["searchTerm"] + "------------ getting viewItems");
    setShowProds(true);
    console.log("---------------in view Items-------------------");
    Axios.post(
      "http://54.82.11.107:4000/api/products/getAllProducts/" + user.id,
      {
        searchTerm: variables["searchTerm"],
      }
    ).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...products, ...response.data.result]);
          console.log(products);
        } else {
          setProducts(response.data.result);
        }
        console.log(user.id);
      } else {
        console.log("Failed in ");
      }
    });
  };

  const editItem = (id) => {
    setShowProductsEditPage(true);
    setProductId(id);
    console.log("Item to edit" + id);
  };

  const editShopImage = () => {
    setShowShowImageEditPage(true);
    console.log("Edit button clicked");
  };

  const editItemImage = (id) => {
    setShowShowImageEditPage(true);
    setProductId(id);
    console.log("Item to edit" + id);
  };

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    console.log(newSearchTerm + ".........................");

    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
      searchTerm: searchTerm,
    };
    setSkip(0);
    viewItems(variables);
  };

  const renderCards = products.map((pro) => {
    return (
      <div className="col-md-4 mb-4">
        <div className="card">
          <img src={pro.itemImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5> Details: </h5>
            <h5 className="card-title">{pro.itemName}</h5>
            <p>Price: ${pro.itemPrice}</p>
            <p className="card-text">{pro.itemDescription}</p>
            <button
              style={{ backgroundColor: "orange" }}
              onClick={() => editItem(pro._id)}
              className="btn-sm btn-dark"
            >
              Edit
            </button>
            &nbsp;&nbsp;
            {/* <button
              onClick={() => editItemImage(pro.itemId)}
              className="btn-sm btn-dark"
            >
              Edit Image
            </button> */}
          </div>
        </div>
      </div>
    );
  });

  let redirectVar = null;
  if (user === null || !cookie.load("user")) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <div>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <ShopHeader />
      <div className="shop_items">
        <div>
          <button
            style={{
              marginLeft: "7.5%",
              padding: "10px",
              width: "25%",
              backgroundColor: "orange",
              border: "none",
              color: "white",
            }}
            onClick={addItems}
          >
            Add More Items..!
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "10%",
            marginTop: "-3.5%",
          }}
        >
          <SearchFeature refreshFunction={updateSearchTerm} />
        </div>
        <div>
          <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1rem auto",
              }}
            ></div>
            {products.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  height: "300px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>No post yet...</h2>
              </div>
            ) : (
              <div className="container-fluid mx-1">
                <div className="row mt-5 mx-1">
                  <div className="col-md-15">
                    <div className="row">{renderCards}</div>
                  </div>
                </div>
              </div>
            )}

            <br />
            <br />
            {postSize >= limit && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={onLoadMore}>Load More</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showProductsAddPage && (
        <AddProducts setShowProductsAddPage={setShowProductsAddPage} />
      )}
      {showProductsEditPage && (
        <EditProducts
          setShowProductsEditPage={setShowProductsEditPage}
          // products={products}
          itemId={productId}
        />
      )}
      {showShowImageEditPage && (
        <EditItemImage setShowProductsEditPage={setShowShowImageEditPage} />
      )}
    </div>
  );
}

export default shopHome;
