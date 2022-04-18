import React from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import EtsyBody from "./EtsyBody";
import AboutFooter from "./AboutFooter";
import FooterBanner from "./FooterBanner";
import ProductsByCategory from "./productsByCategory";
// import Body from "./Body";


const Home = () => {
  return (
    <div>
      <Navbar />
      
      <Hoverbar />
      {/* <Body/> */}

     
      <Dashboard />

      <EtsyBody />
      <ProductsByCategory />
     

      <AboutFooter />

      <Footer />
      <FooterBanner />
    </div>
  );
};

export default Home;
