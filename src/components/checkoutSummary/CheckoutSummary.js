import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import Card from "../card/Card";
import styles from "./CheckoutSummary.module.scss";
import  "./CheckSum.css";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div className="checkSum">
      <h1>Checkout Summary</h1>
      <div>
        {cartItems.lenght === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>
            <div className='sumText'>
              <h4>Subtotal:</h4>
              <h2>{cartTotalAmount.toFixed(2)}</h2>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity, shipfee } = item;
              return (
                <>
                <div className="sumTextCont">
                <Card key={id} cardClass='sumText'>
                <h4>Product: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit price: {price}</p>
                  <p>Set price: {price * cartQuantity}</p>
                  <p>Shipping fee: {shipfee}</p>    
                </Card>
                <hr/> 
                </div>
                </>
                 
               
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
