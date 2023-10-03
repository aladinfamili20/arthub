import React, { useEffect,  } from 'react'
import { doc,deleteDoc} from "firebase/firestore";
 import '../../Styles/AddPost.css'
import { Link } from 'react-router-dom';
import { db, storage } from '../../firebase/config';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Notiflix from "notiflix";
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts 
} from '../../redux/slice/productSlice';
import ProfUseFetchCol from '../../screens/ProfUseFetchCol'; 
 const Artwork = () => {  
  const products = useSelector(selectProducts); 
  const dispatch = useDispatch();
  const {posts} = ProfUseFetchCol('posts') 
 useEffect(() => {
  dispatch(
    STORE_PRODUCTS({
      products: posts,      
    })
  );
}, [dispatch, posts]);
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
      titleColor: "#494949",
      okButtonBackground: "#494949",
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
 
<section>        
       <div className='artsection' id='artsection'>
 {
  products.map((artwork, index)=>{
    const {id, image, medium, price, displayName, name, artSize}= artwork;
    return (
      <div className='artwork' key={id}>
        <p>{index + 1}</p>
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
      <p>{artSize}</p>
      <p>${price}</p>
      </div>
      <Link to={`/addArtwork/${id}`}>
      <FaEdit className='editIcon'/>
      </Link>
      <FaTrash className='editIcon' 
       onClick={() => confirmDelete(id, image)}
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

export default Artwork