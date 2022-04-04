import React from 'react';
import './Product.css';

function Product({id, title, image, price, rating}) {
  return (
    <div className='product'>
        <div className='product_info'>
          <p>{title}</p>
          <p className='product_price'>
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className='product_rating'>
            {   
            //Create an Array size rating and fill it with Empty Values , and then loop it rating times
                Array(rating)  
                .fill()
                .map((_) => (
                    <p>⭐</p>
                ))
            }
            </div>
         <img
          className='product_image'
          src= {image}
          alt=''
         />
         <button className='product_button'>Add to Basket</button>
        </div>    
    </div>
  )
}

export default Product