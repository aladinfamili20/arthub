import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";
import  "./Navbar.css";
import { getAuth,   onAuthStateChanged } from 'firebase/auth'

import { FaUserCircle } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const auth = getAuth()
  const [displayName, setDisplayName] = useState([])
   const userName = useSelector(selectUserName);
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user){
        const uid =  user.uid;
        console.log(uid)
        const artistDocRef = doc(db, 'users', uid);
        const fetchArtist = async () => {
          const docSnap = await getDoc(artistDocRef);
          setDisplayName([{...docSnap.data(), id: docSnap.id}]);
        };    
        fetchArtist();
      }
    })      
  },[]) 
  return (
    <div className="AdminNavCon">
      <div className="AdminProfCon">
        <FaUserCircle size={40} color="#494949" />
        {
          displayName.map((adminName)=>{
            return (<h3>{ adminName.displayName} { adminName.lastName}</h3>)
          })
        }
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
