import React, { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
 import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
 import  "../../components/product/Product.css"; 
import useFetchColGold from "./useFetchColGold";
import ProductFilter from "../../components/product/productFilter/ProductFilter";
import PlatinumProdList from "./PlatinumProdList";
    const PlatinumProdcuts = () => {
   const { platinum, } = useFetchColGold("platinum");

  // const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products:   platinum
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: platinum,
      })
    );
  }, [dispatch, platinum]);

  // const toggleFilter = () => {
  //   setShowFilter(!showFilter);
  // };

  return (
    <section>
    <div className='product'>     
    <aside className='asideFilter'>
      <ProductFilter/>
      </aside>
     <div className='productContent'>
      <PlatinumProdList products={products}/>
    </div>
    </div>
  </section>
  );
};

export default PlatinumProdcuts;
