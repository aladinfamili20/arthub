import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
// import styles from "./Product.module.scss";
import  "../../components/product/Product.css";
import DiamondFilter from '../diamond/DiamondFilter'
import DiamondList from '../diamond/DiamondList'

import spinnerImg from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const { data, isLoading } = useFetchCollection("diamond");
  // const [showFilter, setShowFilter] = useState(false);
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

  // const toggleFilter = () => {
  //   setShowFilter(!showFilter);
  // };

  return (
    <section>
    <div className='product'>
      <aside className='asideFilter'>
      <DiamondFilter/>
      </aside>
     <div className='productContent'>
      <DiamondList products={products}/>
    </div>
    </div>
  </section>
  );
};

export default Product;
