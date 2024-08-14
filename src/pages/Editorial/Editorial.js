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
      <Slider/>
      </div>
      {/* The last slide in the home page */}
   </section>
  );
};

 

export default Editorial;
