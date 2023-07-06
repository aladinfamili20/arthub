import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../redux/slice/productSlice";
import styles from "../../components/product/productFilter/ProductFilter.module.scss";
import   "../../components/product/productFilter/ProductFilter.css";
import { useAuth } from "../../auth/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE, FILTER_BY_DIAMOND } from "../../redux/slice/filterSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const [displayName, setDisplayName]= useState(null)
  const dispatch = useDispatch();
  const {user} = useAuth()
  useEffect(()=>{
 onAuthStateChanged(auth,(user)=>{
    if(user){
      setDisplayName(user.displayName)
    }
 })
  })

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const userName = [
    "All",
    ...new Set(products.map((product) => product.displayName)),
  ];
  // console.log(userName);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, displayName }));
  }, [dispatch, products, displayName]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Artist</h4>
      <div className='ProdFilterInput'>
        <select value={displayName} onChange={(e) => setBrand(e.target.value)}>
          {userName.map((displayName, index) => {
            return (
              <option key={index} value={displayName}>
                {displayName}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        <h4>{`$${price}`}</h4>
         <div className="rangeCon">
      
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
            style={{ background: 'teal', width: '80%' }}
          />
        </div>
    
        <br />
        <button className="btn1" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
