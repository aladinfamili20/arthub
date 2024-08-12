import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
 
import  "./ProductItem.css";
// importing the style file for ProductItem
import '../../../Styles/Artworks.css'
 
const ProductItem = ({ product, year, id, name, price,rarity, lastName, image,medium,displayName,artSize }) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
     <>
     
     <div className='artwork' key={id} id="artsection" >
    <div className='artcollectionbox'>         
       <div >    
  <div 
   className='artworkImageBox'
  >
  <Link to={`/product-details/${id}`}>
   <img src={image} alt="" onContextMenu="return false;" />  
   </Link>  
    </div>     
    {/* <div className="hide">
   <div><h1>{rarity}</h1></div>
  <div><h1>{medium}</h1></div>
  </div> */}
    </div>   
    <div className='artcollectInfo'>
    <div>           
    <h1>{displayName}</h1>
   <div className="NameComp">
   <h2> {name}, </h2>
   <h2> {year} </h2>
   </div>
     {/* <p>{shortenText(artSize)}</p>     
     <b>${price}</b>  */}
    </div>
    {/* <div className='artcollectIcon'    
    onClick={()=>addToCart(product)}><IoBasketSharp size={24} /></div> */}
    </div> 
      </div>           
      </div>
     </>
 
  );
};

export default ProductItem;
