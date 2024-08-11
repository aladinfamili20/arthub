import React  from "react";
  import Slider from "../../components/slider/Slider"; 
import HomeProduct from "./HomeProduct";
import Editorial from "../Editorial/Editorial";
// Hover on the CSS import, press the Ctrl key, once the color changes, press on it and it will direct you to the file.
import '../home/Home.css'
const Home = () => {  
  return (
    <div>
      {/* Slider that apear at the top of the home screen */}
       <Slider />
      <section>        
         {/* Redering new arrival artworks */}
      <HomeProduct/>     
      {/* Rendering the rest of the artworks */}
      <Editorial/>
     </section>
     </div>
  );
};

export default Home;
