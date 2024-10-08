import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
 import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
 import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { IoBasketSharp, IoLogOut } from 'react-icons/io5';
import '../Styles/Navigation.css' 
import { useDispatch, useSelector } from "react-redux";
// import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
 import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../redux/slice/cartSlice";
 import { auth } from "../firebase/config";
 import SearchFuction from "./SearchFuction";
 
  

 

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
   const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);
  // Monitor currently sign in user
   

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  // const cart = (
  //    <div className="NavCartIcont">
  //       <span  >
  //     <Link to="/cart">
  //        <IoBasketSharp className='NavCartIcon'/>
  //       <p>{cartTotalQuantity}</p>
  //      </Link>
  //   </span>
  //    </div>
  // );
  return (
  <>
  <div className="homeScreen">
<headers>
<nav className='navbar'>
{/* Logo */}
<div className='logoHolder'>
<a href='/'>
<img src={require('../images/ArthubLogoblackBac.png')} width={'100%'}  height={50} alt='Art-Hub Logo' />
</a>
</div>
 
<SearchFuction/>
<div>
{/* navigation menu */}
<ul className='nav-links'>
{/* uising checkbox hack */}
<input type='checkbox' id='checkbox_toggle'/>
<label for='checkbox_toggle' className='hamburger'>&#9776;</label>
{/* navigation menu */}
<div className='menu'>
<li><a href='/' className='navName' id="active1">Home</a></li>
<li className='services'>
<a href='/artisthub' className='navName'>Artist</a>
 
</li>

<li className='services' id='navDrop'>
<a href='/gallery' className='navName'>Artworks</a>        
</li>
{/* <li className='services'>
<a href='/gallery' className='navName'>Services</a>
<ul className='dropdown'>
<li><a href="/subscription">Art Subscription</a></li>
 </ul> 
</li>    */}
 
 
 
{/* <li className="logbutton"><a href="/login">Login</a></li> */}
   </div>  
</ul>

 
</div>
</nav>
</headers>

</div>
  
  </>
     
  );
};

export default Header;
