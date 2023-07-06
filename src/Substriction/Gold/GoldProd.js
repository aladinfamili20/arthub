import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
 import  "../../components/product/Product.css"; 
import ProductList from "../../components/product/productList/ProductList";
import useFetchColGold from "./useFetchColGold";
import SubProdList from "../SubProdList";
    const GoldProd = () => {
   const { gold, } = useFetchColGold("gold");

  // const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products:   gold
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: gold,
      })
    );
  }, [dispatch, gold]);

  // const toggleFilter = () => {
  //   setShowFilter(!showFilter);
  // };

  return (
    <section>
    <div className='product'>     
     <div className='productContent'>
      <SubProdList products={products}/>
    </div>
    </div>
  </section>
  );
};

export default GoldProd;
