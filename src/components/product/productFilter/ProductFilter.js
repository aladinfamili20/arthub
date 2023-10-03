import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_MEDIUM,
  FILTER_BY_PRICE,
  FILTER_BY_SIZE,
  FILTER_BY_RARITY,
  FILTER_BY_STYLE,
  FILTER_BY_FRAME,
  FILTER_BY_LOCATION,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";
import styles from "./ProductFilter.module.scss";
import   "./ProductFilter.css";


const ProductFilter = () => {
  const [medium, setMedium] = useState("All");
  const [size, setSize] = useState("All");
  const [rarity, setRarity] = useState("All");
  const [style, setStyle] = useState("All");
  const [frame, setFrame] = useState("All");
  const [country, setCountry] = useState("All");   
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const [displayName, setDisplayName]= useState("All")
  const dispatch = useDispatch();   
  const allMedium = [
    "All",
    ...new Set(products.map((product) => product.medium)),
  ];
 
  
  const allSizes = [
    "All",
    ...new Set(products.map((product) => product.size)),
  ];

  const allRarity = [
    "All",
    ...new Set(products.map((product) => product.rarity)),
  ];

  const allStyle = [
    "All",
    ...new Set(products.map((product) => product.style)),
  ];

  const allFrame = [
    "All",
    ...new Set(products.map((product) => product.frame)),
  ];

  const allCountry = [
    "All",
    ...new Set(products.map((product) => product.country)),
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

  const filterProducts = (med) => {
    setMedium(med);
    dispatch(FILTER_BY_MEDIUM({ products, medium: med }));
  };

 
const filterProductsSize = (siz) => {
    setSize(siz);
    dispatch(FILTER_BY_SIZE({ products, size: siz }));
  };

const filterProductsRarity = (rar) => {
    setRarity(rar);
    dispatch(FILTER_BY_RARITY({ products, rarity: rar }));
  };

const filterProductsStyle = (style) => {
  setStyle(style);
    dispatch(FILTER_BY_STYLE({ products, style: style }));
  };

const filterProductsFrame = (frame) => {
    setFrame(frame);
      dispatch(FILTER_BY_FRAME({ products, frame: frame }));
    };

const filterProductsLocation = (location) => {
      setCountry(location);
        dispatch(FILTER_BY_LOCATION({ products, country: location }));
      };
  const clearFilters = () => {
    setMedium("All");
    setSize("All");
    setRarity("All");
    setStyle("All");
    setFrame("All");
    setCountry("All");
    setDisplayName("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Medium</h4>
      <div className={styles.category}>
        {allMedium.map((med, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${medium}` === med ? `${styles.active}` : null}
              onClick={() => filterProducts(med)}
            >
              &#8250; {med}
            </button>
          );
        })}
      </div>

      <h4>Size</h4>
      <div className={styles.category}>
        {allSizes.map((siz, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${size}` === siz ? `${styles.active}` : null}
              onClick={() => filterProductsSize(siz)}
            >
              &#8250; {siz}
            </button>
          );
        })}
      </div>

      <h4>Rarity</h4>
      <div className={styles.category}>
        {allRarity.map((rar, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${rarity}` === rar ? `${styles.active}` : null}
              onClick={() => filterProductsRarity(rar)}
            >
              &#8250; {rar}
            </button>
          );
        })}
      </div>
      {/* Style */}
      <h4>Style</h4>
      <div className={styles.category}>
        {allStyle.map((styl, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${style}` === styl ? `${styles.active}` : null}
              onClick={() => filterProductsStyle(styl)}
            >
              &#8250; {styl}
            </button>
          );
        })}
      </div>
      
      {/* Style */}
      <h4>Frame</h4>
      <div className={styles.category}>
        {allFrame.map((fram, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${frame}` === fram ? `${styles.active}` : null}
              onClick={() => filterProductsFrame(fram)}
            >
              &#8250; {fram}
            </button>
          );
        })}
      </div>

      {/* Style */}
      <h4>Country</h4>
      <div className={styles.category}>
        {allCountry.map((location, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${country}` === location ? `${styles.active}` : null}
              onClick={() => filterProductsLocation(location)}
            >
              &#8250; {location}
            </button>
          );
        })}
      </div>
      
      <h4>Artist</h4>
      <div className='ProdFilterInput'>
        <select value={displayName} onChange={(e) => setDisplayName(e.target.value)}>
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
