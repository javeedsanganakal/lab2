import React from 'react';
import "./Body.css";
import {Link} from "react-router-dom";

function Body() {
  return (
    <div class='body'>
        <Link className='body_link'>
          <div className='body_option'>
            <img className='body_circleImage' 
              src='https://i.etsystatic.com/12397853/r/il/505fa0/2426681051/il_300x300.2426681051_mocv.jpg'
              alt=''>
            </img>
            <span className='body_circleImageText'>Wall Deckor</span>
          </div>
        </Link>
        <Link className='body_link'>
          <div className='body_option'>
            <img className='body_circleImage' 
              src='https://i.etsystatic.com/10172112/r/il/b85c64/1172658536/il_300x300.1172658536_ep7c.jpg'
              alt=''>
            </img>
            <span className='body_circleImageText'>Outdoor & Garden</span>
          </div>
        </Link>
        <Link className='body_link'>
          <div className='body_option'>
            <img className='body_circleImage' 
              src='https://i.etsystatic.com/10448437/r/il/8d7c57/1985247369/il_300x300.1985247369_d33t.jpg'
              alt=''>
            </img>
            <span className='body_circleImageText'>On Sale</span>
          </div>
        </Link>
        <Link className='body_link'>
          <div className='body_option'>
            <img className='body_circleImage' 
              src='https://i.etsystatic.com/8928370/r/il/f32f25/3376320499/il_300x300.3376320499_7sqq.jpg'
              alt=''>
            </img>
            <span className='body_circleImageText'>Kitechen & Dining</span>
          </div>
        </Link>
        <Link className='body_link'>
          <div className='body_option'>
            <img className='body_circleImage' 
              src='https://i.etsystatic.com/5395361/r/il/5bb896/3641190222/il_300x300.3641190222_fydq.jpg'
              alt=''>
            </img>
            <span className='body_circleImageText'>Necklaces</span>
          </div>
        </Link>
        <Link className='body_link'>
          <div className='body_option'>
            <img className='body_circleImage' 
              src='https://i.etsystatic.com/10115319/r/il/b2ab7a/3171926331/il_300x300.3171926331_p6i7.jpg'
              alt=''>
            </img>
            <span className='body_circleImageText'>Wedding Decor</span>
          </div>
        </Link>
    </div>
  )
}

export default Body