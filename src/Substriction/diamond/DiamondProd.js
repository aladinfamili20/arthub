import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
 import  "../../components/product/Product.css"; 
import ProductList from "../../components/product/productList/ProductList";
import useFetchColDiamond from "./UseFetchColDiamond";
  const SubProduct = () => {
   const { diamond, } = useFetchColDiamond("diamond");
   ;

  // const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products:   diamond
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: diamond,
      })
    );
  }, [dispatch, diamond]);

  // const toggleFilter = () => {
  //   setShowFilter(!showFilter);
  // };

  return (
    <section>
    <div className='product'>     
     <div className='productContent'>
      <ProductList products={products}/>
    </div>
    </div>
  </section>
  );
};

export default SubProduct;
