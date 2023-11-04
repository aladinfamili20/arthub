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
      
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [userName, SetUserName] = useState([]);
  const [scrollPage, setScrollPage] = useState(false);
  const [artist, setArtist] = useState([''])
  // console.log(artist,"Artist Id")
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
    onAuthStateChanged(auth, (user)=>{
      if (user){
        const uid =  user.uid;
        // console.log(uid)
        const artistDocRef = doc(db, 'users', uid);
        const fetchArtist = async () => {
          const docSnap = await getDoc(artistDocRef);
          SetUserName([{...docSnap.data(), id: docSnap.id}]);
        };
        fetchArtist();
      }
    })      
  },[])


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
 
 

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user)=>{
  //     if (user){
  //       const uid =  user.uid;
  //       // console.log(uid)
  //       const artistDocRef = doc(db, 'users', uid);
  //       const fetchArtist = async () => {
  //         const docSnap = await getDoc(artistDocRef);
  //         setArtist([{...docSnap.data(), id: docSnap.id}]);
           
  //       };
  //       fetchArtist();
  //       const fetchData = async () => {
  //         const timestamp = ('timestamp', 'desc')
  //           const citiesRef = collection(db, 'profileUpdate');
  //         const querySnapshot = query(citiesRef, 
  //           where("profID", "==", uid));  
           
  //         orderBy(timestamp);
  //         const snapshot = await getDocs(querySnapshot);
  //         console.log(snapshot)
  //         const documents = snapshot.docs.map((doc) => ({
  //          id: doc.id,
  //             ...doc.data(),
  //            }));
  //            setArtist(documents);
  //       };    
  //       fetchData();
  //     }
  //   })    
  // },[]) 



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

 {/* <AdimRoute>
 <li><a href="/adminpage" className='navName'>Admin</a></li>  
 </AdimRoute> */}
  <AdminOnlyLink>
 <li><a href="/admin/home" className='navName'>Admin</a></li>  
 </AdminOnlyLink>
 
 <div onClick={toggleMenu} className="NavCartIcont">
        <Link to="/cart">
         <IoBasketSharp className='NavCartIcon'/>
        <p>{cartTotalQuantity}</p>
       </Link>
</div>
 
  
{/* {artist.map((artistDatas)=>
 (
    <div key={artistDatas.id}>
    <h1>{artistDatas.artistName}</h1>
    </div>
  )
 )} */}
 {/* <ProfileOnlyLink allowedEmails={[array]}>
<li><a href="artistprofile" className='navName'>Manage</a></li>   
</ProfileOnlyLink> */}

 {/* <ProfileOnlyLink allowIds={[artist.uid]}>
<li><a href="artistprofile" className='navName'>Manage</a></li>   
</ProfileOnlyLink> */}
<li><a href="artistprofile" className='navName'>Manage</a></li>   

<li><a href="/profile" className='navName'>Hi:{displayName}</a></li>  



{/* <li><a href="/profile" className='navName'>Profile</a></li>   */}

 
 {/* <li className='services' id='profileNav'>           
<div  > 
   <a href="/profile"><h3> 
   <div className='profileIconInfo'>
                <h1>Hi:</h1>
                <h1>{displayName}</h1>
              </div>
    </h3> </a>
</div>
<ul className='dropdown'>
 
</ul>
</li>                      */}
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
