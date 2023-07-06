import React, { Component } from 'react'
import '../Styles/Artist.css'
import { FaFacebook, FaHeart, FaInstagram, FaLocationArrow, FaTwitter, FaTwitterSquare } from 'react-icons/fa';

export class Artist extends Component {
  render() {
    return (
      <Artists />
    )
  }
}


const Artists = () => {
  return(
<section className='artistHomeContainer'>
    <div className='artistHomeContent'>
    <div className='artist' >
            <h1>Artists</h1>
            {/* <h2>
            We have a wide range of artists from all over the world. <br/>
            </h2> */}
        </div>
      
      <div className='Artistsection' id='Artistsection'>        
      <div className='Artistscollectionbox'>
              <a href=''>
              <img src={require('../images/Rafiki Profile.JPG')} alt=""/>
              </a>
              <div className='ArtistscollectInfo'>
              <div>
              <h1>Rafaki Famili</h1>
              <h2>Canvas Painter</h2>
              <div>
              <div className='ArtistscollectIcon'>
               <FaLocationArrow />
                <p>Houston Texas</p>                
                </div>
               </div> 
                            
              </div>               
              </div>
              <a href="/artistprofile">
                  <button class="btn1">View Profile</button>
              </a>                                             
          </div>   
  
 
                                                 
      </div>
    </div>
   </section>
  )
}
export default Artist