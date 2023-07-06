import React, { useEffect } from "react";
import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";
import  "./Home.css";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Chart from "../../chart/Chart";

//Icons
const earningIcon = <AiFillDollarCircle size={30} color="#494949" />;
const productIcon = <BsCart4 size={30} color="#333333d0" />;
const ordersIcon = <FaCartArrowDown size={30} color="#303030" />;

const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("posts");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );

    dispatch(STORE_ORDERS(data));

    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);

  return (
    <div className='HomeChartCon'>
        <div>
        <div className='HomeChartContent'>
        <div className='card' id="card1">
        <InfoBox
             cardClass={`HomeCard`}
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningIcon}
        />
        </div>
        <div className='card' id="card2">
        <InfoBox   
          cardClass={`HomeCard`}        
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        </div>
        <div className='card' id="card2">
        <InfoBox
           cardClass={`${'HomeCard'} $ {"HomeCont}`}
          title={"Orders"}
          count={orders.length}
          icon={ordersIcon}
        />
        </div>
      </div>
      <div>
        <Chart

        />
      </div>
        </div>
    </div>
  );
};

export default Home;
