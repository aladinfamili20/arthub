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
import '../../../Styles/signup.css'
import useFetchCollection from '../../../customHooks/useFetchCollection';
import useFetchDocument from '../../../customHooks/useFetchDocument';
 const Registration =()=>{ 
const {id} = useParams()
const [product, setProduct] = useState(null);
const dispatch = useDispatch();
const cartItems = useSelector(selectCartItems);
const { document } = useFetchDocument("posts", id);
const { data } = useFetchCollection("reviews");
const filteredReviews = data.filter((review) => review.productID === id);

const cart = cartItems.find((cart) => cart.id === id);
const isCartAdded = cartItems.findIndex((cart) => {
  return cart.id === id;
});

useEffect(() => {
  setProduct(document);
}, [document]);

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
<h2>{product?.name}</h2>
<h2>{product?.size}</h2>
<h2>{product?.medium}</h2>
<h3 className='price'>{`$${product?.price}`}</h3>
<h4>SKU: {id} </h4>
 
<div className='count'>
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
    className="countbtn"
    onClick={() => addToCart(product)}
  >
    +
  </button>
</>
 )}
                </div>

<a>
 <button className='btn'
  onClick={() => addToCart(product)}
 >Add to Cart</button>
 </a>
 
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
           <div  >
           <h2>Material </h2> 
           <div className='abtArtDet'>
           <h3> 9 colour screenprint on Rives GFK paper
          </h3>
           </div>
           </div>
           <div  >
           <h2>Size </h2> 
          <div className='abtArtDet'>
          <h3> 20 × 20 in | 50.8 × 50.8 cm
          </h3>
          </div>
           </div>
          <div  >
           <h2>Rarity </h2> 
           <div className='abtArtDet'>
           <h3 > Limited edition
          </h3>
           </div>
           </div>
           <div >
           <h2>Medium</h2> 
           <div  className='abtArtDet'><h3> Print</h3></div>
           </div>
             <div>
           <h2>Condition </h2> 
          <div className='abtArtDet'><h3>Exelent Condition</h3></div>
           </div>
           <div>
           <h2>Signature</h2> 
           <div className='abtArtDet'><h3> Hand-signed by artist
          </h3></div>
           </div>
            
           <div >
           <h2>Frame </h2> 
           <div className='abtArtDet'><h3> Included
          </h3></div>
           </div>      
          </div>
          </div>   
        

        <div className='ArtistImgViewConProf'>
           <div className='ArtistImgViewContProf'>
           <div className='ArtistImgViewConDet'>
           <div className='ArtistImgViewConDet'>
           {/* <img src='https://images.unsplash.com/photo-1686594094819-0685648e8925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60' alt="profile" /> */}
            <div className='ArtistImgViewConDetNames'>
              <h2>{product?.displayName}</h2>
              <h4>America</h4>
            </div>
           </div>
            <button>Follow</button>
           </div>
           <div className='ArtistIamgeViewStory'>
           <h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
           </h2>
           </div>
           </div>
        </div>
     
</div>
</section>
</main>
  )

}

export default Registration