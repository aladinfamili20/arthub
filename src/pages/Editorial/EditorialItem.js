import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/slice/cartSlice";
// import Card from "../../card/Card";
// import styles from "./ProductItem.module.scss";
import  "../../components/product/productItem/ProductItem.css";
import { IoBasketSharp } from "react-icons/io5";

const EditorialItem = ({ product, year, id, name, price, desc, image,medium,displayName,artSize }) => {
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
     
     <div className='artwork' key={id}  >
    <div className='artcollectionbox'>         
       <div >    
  <div 
   // id=''
   className='artworkImageBox'

  >
  <Link to={`/product-details/${id}`}>
   <img src={image} alt=""/>  
   </Link>  
    </div>     
    {/* <div className="hide">
   <div><h1>Unique</h1></div>
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
    onClick={()=>addToCart(product)}
    ><IoBasketSharp size={24}  /></div> */}
    </div> 
      </div>           
      </div>
     </>
 
  );
};

export default EditorialItem;
