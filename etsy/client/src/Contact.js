import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div className="contact_shop">
        <h3>Shop</h3>
        <h5>Gift Cards</h5>
        <h5>Sitemap</h5>
        <h5>Etsy blog</h5>
      </div>

      <div className="contact_sell">
        <h3>Sell</h3>
        <h5>Sell on Etsy</h5>
        <h5>Teams</h5>
        <h5>Fourms</h5>
        <h5>Affiliates</h5>
      </div>

      <div className="contact_about">
        <h3>About</h3>
        <h5>Etsy, Inc.</h5>
        <h5>Policies</h5>
        <h5>Investors</h5>
        <h5>Careers</h5>
        <h5>Press</h5>
        <h5>Impact</h5>
      </div>

      <div className="contact_help">
        <h3>Help</h3>
        <h5>Help Center</h5>
        <h5>Trust and safety</h5>
        <h5>Privacy settings</h5>
      </div>
      
    </div>
  );
}

export default Contact;
