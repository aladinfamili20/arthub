import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
 
// import Card from "../../card/Card";
// import styles from "./ProductItem.module.scss";
import  "../../components/product/productItem/ProductItem.css";
import { IoBasketSharp } from "react-icons/io5";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../../redux/slice/cartSlice";

const GoldProdItem = ({ product, grid, id, name, price, desc, image,subscription,displayName,size,frame }) => {
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
  <div id='myDIV'>
  <Link to={`/golddetail/${id}`}>
   <img src={image} alt=""/>  
   </Link>  
    </div>     
    <div className="hide">
   <div><h1>Unique</h1></div>
  <div><h1>{subscription}</h1></div>
  </div>
    </div>   
    <div className='artcollectInfo'>
    <div>           
    <h1>{displayName}</h1>
   <b> {name} </b>
    <p>{subscription}</p>
    <p>{frame}</p>
    <p>{size}</p>
    <div className="PriceComp"> 
    <b>$550/mon</b>     
     <p>${price}</p>
    <p>Purchase</p>    
    </div>
    </div>
    <div className='artcollectIcon'    
    onClick={()=>addToCart(product)}
    ><IoBasketSharp size={24}  /></div>
    </div> 
      </div>           
      </div>
     </>
 
  );
};

export default GoldProdItem;
