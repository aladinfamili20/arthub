import React, { useEffect, useState } from 'react'
import {collection , where, query, getDocs, getDoc, doc, orderBy, deleteDoc} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
 import '../Styles/AddPost.css'
import { Link } from 'react-router-dom';
import { db, storage } from '../firebase/config';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Notiflix from "notiflix";
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../redux/slice/productSlice';
 import ProfDiamondFetchCol from '../screens/ProfDiamondFetchCol';
 
 


 const ViewProfDiamond = () => {
  
  const products = useSelector(selectProducts);
 
  const dispatch = useDispatch();
   const {diamond} = ProfDiamondFetchCol('diamond')
 
 useEffect(() => {
  dispatch(
    STORE_PRODUCTS({
        products: diamond,
 

    })
  );
}, [dispatch,diamond]);

// Subsctriction
 

const confirmDelete = (id, image) => {
  Notiflix.Confirm.show(
    "Delete Product!!!",
    "You are about to delete this product",
    "Delete",
    "Cancel",
    function okCb() {
      deleteProduct(id, image);
    },
    function cancelCb() {
      console.log("Delete Canceled");
    },
    {
      width: "320px",
      borderRadius: "3px",
      titleColor: "orangered",
      okButtonBackground: "orangered",
      cssAnimationStyle: "zoom",
    }
  );
};

const deleteProduct = async (id, image) => {
  try {
    await deleteDoc(doc(db, "posts", id));

    const storageRef = ref(storage, image);
    await deleteObject(storageRef);
    toast.success("Product deleted successfully.");
  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <>
    <div className='artsection' id='artsection'>   
   {/* Subsctriction */}
   <h1>Diamond</h1>
   <section>  
          {/* Diamond */}
       <div className='artsection' id='artsection'>
       
 {
  products.map((dia, index)=>{
    const {id, image, name, displayName, price, medium, size} = dia;
    return (
      <div className='artwork' key={id}>
  <div className='artcollectionbox'>   
  <div>    
 <Link to={`/product-details/${id}`}>
 <img src={image} alt=""/>  
 </Link> 
  </div>
  <div className='artcollectInfo'>
  <div>           
   <h1>{displayName}</h1>
   <h2>{name}</h2>
  <p>{medium}</p>
  <p>{size}</p>
  <div className="PriceComp"> 
    <b>$379/mon</b>     
     <p>${price}</p>
    <p>Purchase</p>    
    </div>
  </div>
  <Link to={`/addArtwork/${id}`}>
      <FaEdit className='editIcon'/>
      </Link>
  <FaTrash className='trash' 
       onClick={() => confirmDelete(id, price, medium, size)}
      />
   </div>
   </div>
    </div>
    )
  })
}
</div>         
   </section> 
 
</div>
    </>
  )
}

export default ViewProfDiamond