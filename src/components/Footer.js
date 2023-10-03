import React from "react"
import '../Styles/HomeScreen.css'
import { FaFacebook,  FaInstagram, FaTwitter,  } from 'react-icons/fa';

const Footer = ()=>{
    return (
        <section>
             <footer>
             <div id="container3" class="mainContent1">
                    <div class="col">
                    <div class="col">
                        <h4>About</h4>
                        <a href="/contact">Contact</a>
                        <a href="/aboutus">About us</a>                        
                        <a href="/privacypolicy">Privacy Policy</a>
                        {/* <a href="#">Delivety information</a> */}
                                          
                    </div>
                        <div class="social-media">
                            <h4>Follow Us</h4>
                            <div class="social-icon">
                                <li><a href=""><i ><FaInstagram/></i></a></li>
                                <li><a href=""><i ><FaFacebook/></i></a></li>
                                <li><a href=""><i ><FaTwitter/></i></a></li>
                             </div>
                        </div>
                    </div>        
                     
        
                    {/* <div class="col">
                        <h4>Partnership</h4>
                        <a href="#">Business</a>
                        <a href="#">Individual</a>                                               
                                          
                    </div> */}
        
                    {/* <div class="col">
                        <h4>My Account</h4>
                        <a href="/login">Sign In</a>
                        <a href="/cart">View Cart</a>
                        <a href="#">My Wishlists</a>
                        <a href="#">Track My Order</a>
                        <a href="#">Help</a>
                    </div> */}
        
                    {/* <div class="col install">
                        <h4>Download the App</h4>
                        <p>From App Store or Google Play</p>
                        <div class="row">
                            <img src="/images/google-play-badge.png" alt=""/>
                            <img src="/images/app-store-badge.png" alt=""/>
                            <p>Secure Payment Gateway</p> 
                            <img class="pay" src="/images/payments.png" alt=""/>
                        </div>
                    </div> */}

                 </div>
             </footer>
        </section>
    )
 
 }

export default Footer