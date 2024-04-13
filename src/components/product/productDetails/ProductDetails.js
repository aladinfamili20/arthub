import React, { useContext, useEffect, useState } from 'react'
import {  Link, useParams } from 'react-router-dom' 
 import { doc, getDoc } from 'firebase/firestore'
import '../productDetails/ProductDetails.css'
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import '../../../Styles/signup.css'
import useFetchCollection from '../../../customHooks/useFetchCollection';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import UseFetchArtistProfDoc from '../../../customHooks/UseFetchArtistProfDoc';
import StarsRating from 'react-star-rate';
 const Registration =()=>{ 
const {id} = useParams()
const [product, setProduct] = useState(null);
const [artistInfo, setArtistInfo] = useState('');

const dispatch = useDispatch();
const cartItems = useSelector(selectCartItems);
const { document } = useFetchDocument("posts", id);
const { artist } = UseFetchArtistProfDoc("posts", id);
 const { data } = useFetchCollection("reviews");
const filteredReviews = data.filter((review) => review.productID === id);

const cart = cartItems.find((cart) => cart.id === id);
const isCartAdded = cartItems.findIndex((cart) => {
  return cart.id === id;
});

useEffect(() => {
  setProduct(document);
}, [document]);

useEffect(() => {
  setArtistInfo(artist);
}, [artist]);

const addToCart = (product) => {
  dispatch(ADD_TO_CART(product));
  dispatch(CALCULATE_TOTAL_QUANTITY());
};

const decreaseCart = (product) => {
  dispatch(DECREASE_CART(product));
  dispatch(CALCULATE_TOTAL_QUANTITY());
};

  return (
    <main>
<section>
<div className='upContainer'>
<div className='upContent'>
<div className='upImg'>
<img src={product?.image} alt="imagedetail" />
</div>
<div className='upInfo'>
<div className='imageInfo'>
<div className='imageInfoView'>    
<h1>{product?.displayName}</h1>
<div className='detNameInfo'>
<h2><b>{product?.name},</b></h2>
<h2><b>{product?.year}</b></h2> 
</div>
<h2>{product?.rarity}</h2>
<h2>{product?.artSize}</h2> 

{/* <h3 className=''>{`$${product?.price}`}</h3> */}
{/* <h2 className=''>Shipping fee {`$${product?.shipfee}`}</h2> */}

{/* <div className='count'>
                  {isCartAdded < 0 ? null : (
<>
  <button
    className="countbtn"
    onClick={() => decreaseCart(product)}
  >
    -
  </button>
  <p>
    <b>{cart.cartQuantity}</b>
  </p>
  <button
    className="btn"
    onClick={() => addToCart(product)}
  >
    +
  </button>
</>
 )}
 </div> */}

{/* <a>
 <button className='btn'
  onClick={() => addToCart(product)}
 >Add to Cart</button>
 </a> */}
 
<div>
<p>
   {product?.desc}
   </p> 
</div>
 </div>  
</div>
</div>
</div>
{/* <div className='hr'><hr></hr>  </div> */}
<div className='aboutArtWork'>
          <h1>About the work</h1>
          <div className='abtArtWork'>
           <div className='abtArtWorkinpt' >
           <h2>Material:</h2> 
           <h3>{product?.material} </h3> 
           </div>                      
           <div className='abtArtWorkinpt'>
           <h2>Medium: </h2> 
           <h3> {product?.medium}</h3> 
           </div>
              
           <div className='abtArtWorkinpt'>
           <h2>Signature: </h2>
           <h3>{product?.sign}</h3>            
           </div>
            
           <div className='abtArtWorkinpt'>
           <h2>Frame: </h2>
           <h3>{product?.frame}</h3>
            </div> 
            <div className='abtArtWorkinpt'>
           <h2>Special Features: </h2>
           <h3>{product?.specialfeature}</h3>
            </div> 
            <div className='abtArtWorkinpt'>
           <h2>Ship from: </h2>
           <h3>{product?.country}</h3>
            </div>            
          </div>
          </div>  
        

        <div className='ArtistImgViewConProf'>
           <div className='ArtistImgViewContProf'>
           {/* <div className='ArtistImgViewConDet'>
           <div className='ArtistImgViewConDet'>
           <img src='https://images.unsplash.com/photo-1686594094819-0685648e8925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60' alt="profile" />
            <div className='ArtistImgViewConDetNames'>
              <h2>{product?.displayName}</h2>
              <h4>{product?.country}</h4>
            </div>
           </div>
           <div className='btn'>
           <button>Follow</button>
           </div>
           </div>
           <div className='ArtistIamgeViewStory'>
           <h2>
            {artistInfo?.displayName}
           </h2>
           </div> */}
           </div>

           {/* <Card cardClass='reviewcard'>
          <h1>Product Reviews</h1>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
  {filteredReviews.map((item, index) => {
    const { rate, review, reviewDate, userName, image } = item;
    return (
      <div key={index} className='reviewcontainer'>
         <div className='reviewcont'>
         <h1>
          <b>{userName}</b>
        </h1>
        
        <h2>
          <b>{reviewDate}</b>
        </h2>
        <StarsRating value={rate} className="rating" />        
        <p>{review}</p>
        <img src={image}
        style={{width: '50%', 
        marginTop: '20px',marginBottom: '20px', backgroundClip: '#f5f5f5', height: '50%'}}  alt='productreviewimage'/>
         </div>
        
        <hr style={{width: '100%', marginTop: '20px',marginBottom: '20px', backgroundClip: '#f5f5f5'}}></hr>
        
      </div>
    );
  })}
</>
            )}
          </div>
        </Card> */}
        </div>
     
</div>
</section>
</main>
  )

}

export default Registration