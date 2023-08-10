import React  from "react";
  import Slider from "../../components/slider/Slider"; 
import HomeProduct from "./HomeProduct";
import Editorial from "../Editorial/Editorial";
import '../home/Home.css'
const Home = () => {  
  return (
    <div>
      {/* <SlideShow/> */}
      <Slider />
      <section>         
      <HomeProduct/>     
      <div className="roomIllusion">
      <h2>
        Collection
      </h2>
      </div>  
      <Editorial/>
     </section>
     </div>
  );
};

export default Home;
