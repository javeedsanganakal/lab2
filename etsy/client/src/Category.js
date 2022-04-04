import React from 'react';
import './Category.css'
import {Link} from "react-router-dom";


function Category() {
  return (
    <div className='category'>
        <Link to='/' className='category_link'>
          <div className='category_option'>
              <span className='category_optionOne'>Home Favorites</span>
          </div>
        </Link>
        <Link to='/' className='category_link'>
          <div className='category_option'>
              <span className='category_optionOne'>Jewelry & Accessories</span>
          </div>
        </Link>
        <Link to='/' className='category_link'>
          <div className='category_option'>
              <span className='category_optionOne'>Clothing & Shoes</span>
          </div>
        </Link>
        <Link to='/' className='category_link'>
          <div className='category_option'>
              <span className='category_optionOne'>Wedding & Party</span>
          </div>
        </Link>
        <Link to='/' className='category_link'>
          <div className='category_option'>
              <span className='category_optionOne'>Toys & Entertainment</span>
          </div>
        </Link>
        <Link to='/' className='category_link'>
          <div className='category_option'>
              <span className='category_optionOne'>Art & Collectibles</span>
          </div>
        </Link>
        <Link to='/' className='category_link'>
          <div className='category_option'>
              <span className='category_optionOne'>Craft Supplies</span>
          </div>
        </Link>
        <Link to='/' className='category_link'>
          <div className='category_option'>
              <span className='category_optionOne'>Gifts & Gift Cards</span>
          </div>
        </Link>
    </div>
  )
}

export default Category