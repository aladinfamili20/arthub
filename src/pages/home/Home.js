import React, { useEffect } from "react";
import Product from "../../components/product/Product";
// import SlideShow from '../../components/SlideShow' 
import Slider from "../../components/slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { IoBasketSharp } from "react-icons/io5";
import HomeProduct from "./HomeProduct";
import Editorial from "../Editorial/Editorial";

const Home = () => {


  const dispatch = useDispatch();
  const {data} = useFetchCollection("posts")
   const products = useSelector(selectProducts)
  useEffect(()=>{
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    )
  },[dispatch, data])

  const addToCart = (product) => {
      dispatch(ADD_TO_CART(product));
      dispatch(CALCULATE_TOTAL_QUANTITY());
    };

  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#posts")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <div>
      {/* <SlideShow/> */}
      <Slider />
      <section>        
 
 <HomeProduct/>
 {/* <Editorial/> */}
     </section>
     </div>
  );
};

export default Home;
