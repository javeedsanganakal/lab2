import React from 'react';
import Product from './Product';
import './Home.css';

function Home() {
  return (
    <div className='home'>
        {/* <img className="" 
             src='' 
             alt=''
        /> */}
        {/* Product id, title, price, rating, image */}
      <div className='home_row'>
        <Product
          id="01"
          title="Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future"
          price= {10.49}
          rating= {5}
          image="https://images-na.ssl-images-amazon.com/images/I/5112YFsXIJL.jpg"
        />
        <Product
          id="02"
          title="Shoe Dog: A Memoir by the Creator of Nike"
          price= {12.50}
          rating= {4}
          image="https://images-na.ssl-images-amazon.com/images/I/41XC4j0HiQL._SX331_BO1,204,203,200_.jpg"
        />
      </div>
      <div className='home_row'>
        <Product
          id="03"
          title="Set of 4 Mini Handmade Paper Plants"
          price= {55.96}
          rating= {5}
          image="https://i.etsystatic.com/29669210/r/il/48a8a1/3619807266/il_680x540.3619807266_4hg4.jpg"
        />
        <Product
          id="04"
          title="1 Southern Pine Chair/ Folding Chair/Portable Chair/Decorative Chair"
          price= {199}
          rating= {4}
          image="https://i.etsystatic.com/10172112/r/il/b85c64/1172658536/il_1588xN.1172658536_ep7c.jpg"
        />
        <Product
          id="05"
          title="Handmade Copper Plant Stand"
          price= {20}
          rating= {4}
          image="https://i.etsystatic.com/12462721/r/il/1de7eb/1953388979/il_1588xN.1953388979_megr.jpg"
        />
      </div>
      <div className='home_row'>
        <Product
          id="06"
          title="Unique 3D Birch Tree Wall Art"
          price= {20}
          rating= {4}
          image="https://i.etsystatic.com/11048283/r/il/649b60/3329782570/il_1588xN.3329782570_5cy4.jpg"
        />
      </div>
      <div className='home_row'>
        <Product
          id="07"
          title="Personalized Wooden French Press with Engraved Name. Custom Coffee Tea Press as Coffee Lover Gift."
          price= {25}
          rating= {4}
          image="https://i.etsystatic.com/29453266/r/il/959348/3638402759/il_1588xN.3638402759_hbg9.jpg"
        />
        <Product
          id="08"
          title="Tea/Coffee Japanese Hand-crafted Ceramic Kiln Glazed Handpainted Wood Pattern"
          price= {49.52}
          rating= {5}
          image="https://i.etsystatic.com/33157249/r/il/1bc1ae/3559593063/il_1588xN.3559593063_43ft.jpg"
        />
        <Product
          id="09"
          title="Fresh Coffee Soy Wax Candle | Amber Jar Candle | Coffee Scented Jar Candle"
          price= {20}
          rating= {5}
          image="https://i.etsystatic.com/10385964/r/il/e0b9fe/2992396185/il_1588xN.2992396185_82qj.jpg"
        />
        <Product
          id="10"
          title="Personalized Handmade Mug, Artisan Mug, Mug with handle, Ceramic Coffee Mug"
          price= {48.99}
          rating= {5}
          image="https://i.etsystatic.com/31625031/r/il/243c36/3535792947/il_1588xN.3535792947_c7tt.jpg"
        />
      </div>
      {/* Product */}
    </div>
  )
}

export default Home