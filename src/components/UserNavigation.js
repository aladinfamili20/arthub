import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
  import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { IoBasketSharp, IoLogOut } from 'react-icons/io5';
import '../Styles/Navigation.css' 
import { useDispatch, useSelector } from "react-redux";
  import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../redux/slice/cartSlice";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../redux/slice/authSlice";
import { auth, db } from "../firebase/config";
import { AdminOnlyLink } from "./adminOnlyRoute/AdminOnlyRoute";
import ProfileOnlyLink from "./admin/profile/ProfileOnlyRoute";
import {collection , where, query, getDocs, getDoc, doc, orderBy, } from "firebase/firestore";
import Search from "./search/Search";
import SearchFuction from "./SearchFuction";
      
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
   const [scrollPage, setScrollPage] = useState(false);
  const [artist, setArtist] = useState([''])
  // console.log(artist,"Artist Id")
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
}, []);
const allowArtistList = Object.keys(artist).map(function(name){
  var obj = {};
  obj[name] = artist[name].id
  return obj[name]
 })
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

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profileUpdate'));
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setArtist(documents);
      } catch (error) {
        console.error('Error fetching data:', error, );
      }
    };
    fetchData();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  
 
 

  

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
{/* sereach bar */}
{/* <div className='searchBar'>
<input type='text' placeholder='Search by artirst' />
</div> */}

 <SearchFuction/>
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
<a href='/artisthub' className='navName'>Artists</a>
</li>
<li className='services' id='navDrop'>
<a href='/gallery' className='navName'>Artworks</a>
</li>
<li className='services'>
<a 
 className='navName'>Services</a>
<ul className='dropdown'>
<li><a href="/subscription">Subscription</a></li>
  </ul> 
</li>   

 
  <AdminOnlyLink>
 <li><a href="/admin/home" className='navName'>Admin</a></li>  
 </AdminOnlyLink>
 
 <div onClick={toggleMenu} className="NavCartIcont">
        <Link to="/cart">
         <IoBasketSharp className='NavCartIcon'/>
        <p>{cartTotalQuantity}</p>
       </Link>
</div>
 
 <ProfileOnlyLink allowIds={allowArtistList}>
<li><a href="artistprofile" className='navName'>Manage</a></li>   
</ProfileOnlyLink>
 

<li><a href="/profile" className='navName'>Hi:{displayName}</a></li>  
 
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
