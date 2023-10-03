import React from 'react'
import '../Styles/Artist.css'
import {  FaInstagram} from 'react-icons/fa';
  import ArtistsFetchCol from '../customHooks/ArtistsFetchCol';
 import { IoLocationOutline,  IoLogoFacebook,  IoLogoInstagram,  IoLogoTwitter,  IoMailOutline } from 'react-icons/io5';
 const Artists = () => {
  const {artist} = ArtistsFetchCol('profileUpdate')
    return(
<section className='artistmainCon'>
{/* <div class="header">
  <hr></hr>
  <h1>Chania</h1>
</div> */}

{artist.map((artistProf)=>{
  return(
    <>
     <div class="header">
 </div>

<div className="row">
  <div className="col-3 col-s-3 menu1">
        <img src={artistProf.profImage} alt='profileimage'/>
   </div>

  <div className="col-6 col-s-9">
     <p>{artistProf.desc}</p>
  </div>

  <div className="col-3 col-s-12">
    <div className="aside">
    <div className=" ">
       <h2>{artistProf.displayName}</h2>
      <h2 className='oilineicons'><IoMailOutline/>
      {artistProf.email}
      </h2>
      <h2 className='oilineicons'><IoLocationOutline/>
      {artistProf.country}
      </h2>
      <h2><a href={artistProf.insta} target='blank' className='oilineicons'><IoLogoInstagram/>Follow</a></h2>
      <h2><a href={artistProf.twitter} target='blank' className='oilineicons'><IoLogoTwitter/>Follow</a></h2>
      <h2><a href={artistProf.facebook} target='blank' className='oilineicons'><IoLogoFacebook/>Follow</a></h2>

   </div>
    </div>
  </div>
</div>

 
    </>
  )
})}

 
   </section>
  )
}
export default Artists