import React from "react";
import EditorioProduct from "./EditorioProduct";
 import Slider from "../Slider/EditorialSlider";

const Editorial = () => {   
  return (
    <section>        
      <EditorioProduct />
      <div className="roomIllusion">
      <h2>
        Room Illusions
      </h2>
      </div>  1
      {/* The last slide in the home page */}
      <Slider/>
   </section>
  );
};

 

export default Editorial;
