import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import  "../../components/product/Product.css";
import EditorialList from "./EditorialList";

const EditorioProduct = () => {
  const { data, isLoading } = useFetchCollection("posts");
   const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

   

  return (
    <section>
            <div className="roomIllusion">
      <h2>
        Collection
      </h2>
      </div>  
    <div className='product'>
      
     {isLoading ? (
      <><h2>Loading...</h2></>
     ) : (
      <>
      <div className='productContent'>
      <EditorialList products={products}/>
    </div>
      </>
     )}
    </div>
  </section>
  );
};

export default EditorioProduct;
