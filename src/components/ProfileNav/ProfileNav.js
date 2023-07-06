import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
 import styles from "../admin/navbar/Navbar.module.scss";
import  "../admin/navbar/Navbar.css";
import '../ProfileNav/ProfileNav.css'
import { FaUserCircle } from "react-icons/fa";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
 
  return (
    <div className="ProfileNav">
       
      <nav>
        <ul>
          <li>
            <NavLink to="/artworks"  >
              Artworks
            </NavLink>
          </li>
          <li>
            <NavLink to="/uploadart"  >
              Upload Artwork
            </NavLink>
          </li>
          
       
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
