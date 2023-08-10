import React, { Component, useEffect } from 'react'
import '../Styles/Artworks.css' 
import { FaFacebook,  FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoBasketSharp} from 'react-icons/io5';
 import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../redux/slice/productSlice';
import { Link } from 'react-router-dom';
import useFetchCollection from '../customHooks/useFetchCollection';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../redux/slice/cartSlice';
import Product from '../components/product/Product';
 
const Artist =()=> {
 
    return (
        <section> 
        <Product/> 
         </section>
    ) 
}
 

 

export default Artist