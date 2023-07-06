import React from 'react'
import { Slide } from "react-slideshow-image";
import '../Styles/SlideShow.css'
import { IoHeartOutline } from "react-icons/io5";

const SlideShow = () => {
  return (
      <div className="slide-container">
          <Slide>
              <div className="each-fade">
  <div className="image-container">
  <img src={require('https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80')} width="100%" height="100%" alt=""/>
  </div>
              </div>
              <div className="each-fade">
  <div className="image-container">
  <img src='https://i.pinimg.com/originals/4f/93/a3/4f93a334178a787701d2b440f8f7837b.jpg' width="100%" height="100%" alt=""/>
  </div>
              </div>
              <div className="each-fade">
  <div className="image-container">
  <img src='https://static.wixstatic.com/media/4e7e01_eb60bf00464849db9c966cd90763e03e~mv2.png/v1/fill/w_980,h_551,al_c,q_90,usm_0.66_1.00_0.01/4e7e01_eb60bf00464849db9c966cd90763e03e~mv2.webp'  width="100%" height="100%" alt=""/>
  </div>
              </div>
          </Slide>
      </div>
  )
}

export default SlideShow