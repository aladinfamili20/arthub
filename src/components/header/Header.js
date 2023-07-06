import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
 import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
 import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { IoBasketSharp, IoLogOut } from 'react-icons/io5';
import '../header/Header.css' 


import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

 

 

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

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

  const cart = (
    <span  >
      <Link to="/cart">
         <IoBasketSharp className='NavCartIcon'/>
        <p>{cartTotalQuantity}</p>
       </Link>
    </span>
  );

  return (
  <>
  <div className="homeScreen">
<headers>
<nav className='navbar'>
{/* Logo */}
<div className='logoHolder'>
<a href='/'>
<img src={require('../../assets/images/Logo.png')} width={200}  height={50} alt='Art-Hub Logo' />
</a>
</div>
{/* sereach bar */}
{/* <div className='searchBar'>
<input type='text' placeholder='Search by artirst, style, tag and more' />
</div> */}
<div>
{/* navigation menu */}
<ul className='nav-links'>
{/* uising checkbox hack */}
<input type='checkbox' id='checkbox_toggle'/>
<label for='checkbox_toggle' className='hamburger'>&#9776;</label>
{/* navigation menu */}
<div className='menu'>
<li><a href='/' className='navName'>Home</a></li>
<li className='services'>
<a href='/artist' className='navName'>Artist</a>
<ul className='dropdown'>
<li><a href="/">Peter Wu</a></li>
<li><a href="/">Danny Chu</a></li>
<li><a href="/">Peter Wu</a></li>
<li><a href="/">Delton Gerdes</a></li>
<li><a href="/artistprofile">Rafiki Famili</a></li>
</ul> 
</li>

<li className='services' id='navDrop'>
<a href='/gallery' className='navName'>Artworks</a>
<ul className='dropdown'>
<li><a href="/">Painting</a></li>
<li><a href="/">Crafts</a></li>   
<li><a href="/">Painting</a></li>
<li><a href="/">Crafts</a></li>
</ul>
</li>
<li className='services'>
<a href='/gallery' className='navName'>Services</a>
<ul className='dropdown'>
<li><a href="/subscription">Art Subscription</a></li>
<li><a href="/">For Business</a></li>
</ul> 
</li>   
 {/* <AdimRoute>
 <li><a href="/adminpage" className='navName'>Admin</a></li>  
 </AdimRoute> */}

  <AdminOnlyLink>
 <li><a href="/admin/home" className='navName'>Admin</a></li>  
 </AdminOnlyLink>

<div onClick={toggleMenu} > {cart}</div>
<hr></hr>
     
                   
 <li className='services' id='profileNav'>           
<div id='profileIconInfo'>
  <a href='/profile' className='navName' id='profTitle'>
  {/* <h3>Hi: {displayName}</h3>  */}
   </a> 
</div>
<ul className='dropdown'>
<li className="logOut" onClick={logoutUser} ><IoLogOut/> Log out</li>
</ul>
</li>            
         
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
